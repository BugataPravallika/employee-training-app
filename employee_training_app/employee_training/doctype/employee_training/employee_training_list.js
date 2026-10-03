frappe.listview_settings["Employee Training"] = {
    onload(listview) {
        listview.page.add_inner_button("Process Training Records", () => {

            frappe.call({
                method: "employee_training_app.employee_training.doctype.employee_training.employee_training.enqueue_training_processing",

                callback(response) {
                    if (!response.exc) {
                        frappe.msgprint(
                            response.message || "Training processing job queued successfully."
                        );
                    }
                }
            });

        });
    }
};