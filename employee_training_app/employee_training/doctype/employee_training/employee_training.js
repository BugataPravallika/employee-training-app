frappe.ui.form.on("Employee Training", {
    refresh(frm) {
        frm.add_custom_button("Fetch Training Records", function () {

            const fields = [
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
            ];

            const url =
                "/api/resource/Employee%20Training?fields=" +
                encodeURIComponent(JSON.stringify(fields)) +
                "&limit_page_length=20";

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch training records");
                    }
                    return response.json();
                })
                .then(result => {

                    const records = result.data || [];

                    if (!records.length) {
                        frappe.msgprint("No training records found.");
                        return;
                    }

                    let html = `
                        <div style="overflow-x:auto;">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>Employee Name</th>
                                        <th>Department</th>
                                        <th>Training Name</th>
                                        <th>Training Type</th>
                                        <th>Status</th>
                                        <th>Certified</th>
                                    </tr>
                                </thead>
                                <tbody>
                    `;

                    records.forEach(record => {
                        html += `
                            <tr>
                                <td>${record.employee_id || ""}</td>
                                <td>${record.employee_name || ""}</td>
                                <td>${record.department || ""}</td>
                                <td>${record.training_name || ""}</td>
                                <td>${record.training_type || ""}</td>
                                <td>${record.status || ""}</td>
                                <td>${record.is_certified ? "Yes" : "No"}</td>
                            </tr>
                        `;
                    });

                    html += `
                                </tbody>
                            </table>
                        </div>
                    `;

                    const dialog = new frappe.ui.Dialog({
                        title: "Employee Training Records",
                        size: "extra-large",
                        fields: [
                            {
                                fieldname: "training_records",
                                fieldtype: "HTML"
                            }
                        ]
                    });

                    dialog.fields_dict.training_records.$wrapper.html(html);
                    dialog.show();
                })
                .catch(error => {
                    console.error(error);
                    frappe.msgprint(
                        "Unable to fetch Employee Training records."
                    );
                });
        });
    }
});