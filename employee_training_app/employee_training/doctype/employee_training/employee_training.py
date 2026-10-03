import frappe
from frappe.model.document import Document


class EmployeeTraining(Document):

    def validate(self):
        frappe.log_error(
            title="Employee Training Validation",
            message=(
                f"Employee ID: {self.employee_id}\n"
                f"Employee Name: {self.employee_name}\n"
                f"Training Name: {self.training_name}\n"
                f"Status: {self.status}"
            )
        )

        if self.duration_hours and self.duration_hours < 0:
            frappe.throw("Duration cannot be negative")


@frappe.whitelist()
def get_training_records():

    records = frappe.db.get_list(
        "Employee Training",
        fields=[
            "name",
            "employee_id",
            "employee_name",
            "department",
            "training_name",
            "training_type",
            "training_date",
            "trainer_name",
            "duration_hours",
            "status",
            "is_certified",
            "employee_email"
        ],
        order_by="training_date desc",
        page_length=20
    )

    return records


def process_training_records():

    records = frappe.get_all(
        "Employee Training",
        fields=[
            "name",
            "employee_id",
            "employee_name"
        ]
    )

    frappe.log_error(
        title="Background Job Started",
        message=f"Processing {len(records)} Employee Training records."
    )

    for record in records:

        doc = frappe.get_doc("Employee Training", record.name)

        doc.status = "Training Started"
        doc.save(ignore_permissions=True)

    frappe.log_error(
        title="Background Job Completed",
        message=f"Processed {len(records)} Employee Training records successfully."
    )


@frappe.whitelist()
def enqueue_training_processing():

    frappe.log_error(
        title="Background Job Queued",
        message="Employee Training background job has been queued."
    )

    frappe.enqueue(
        "employee_training_app.employee_training.doctype.employee_training.employee_training.process_training_records",
        queue="default",
        timeout=300,
        enqueue_after_commit=True
    )

    return "Training processing job queued successfully"