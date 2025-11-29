frappe.ui.form.on("Opportunity", {
	refresh(frm) {

		if (!frm.is_new()) {
			frm.add_custom_button(
				__("Hire Agreement"),
				() => {
					frappe.new_doc("Hire Agreement", {
						opportunity: frm.doc.name
					});
				},
				__("Create")
			);

		}
	}
});

