// // Copyright (c) 2025, me and contributors
// // For license information, please see license.txt

frappe.ui.form.on("Hire Agreement", {
	refresh(frm) {
		if (frm.doc.docstatus === 1) {
			frm.add_custom_button(__('Create Sales Order'), function () {
				frappe.model.open_mapped_doc({
					method: "rental_business.rental_business.doctype.hire_agreement.hire_agreement.make_sales_order",
					frm: frm
				});
			});
		}

		frm.set_query("item", "items", function () {
			return {
				filters: { "is_rental_item": 1 }
			};
		});
	},

	rental_duration(frm) {
		frm.trigger("calculate_totals");
	},

	start_date(frm) {
		frm.trigger("calculate_totals");
	},

	end_date(frm) {
		frm.trigger("calculate_totals");
	},

	calculate_totals(frm) {
		let total = 0;

		(frm.doc.items || []).forEach(row => {
			total += row.amount || 0;
		});

		frm.set_value("total_amount", total);
	}
});


frappe.ui.form.on("Items", {
	item(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		if (!row.item) return;

		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "Item",
				name: row.item
			},
			callback(r) {
				if (r.message) {
					let item = r.message;

					if (frm.doc.rental_duration === "Days") {
						row.rate = item.daily_rate || 0;
					} else if (frm.doc.rental_duration === "Week") {
						row.rate = item.weekly_rate || 0;
					} else if (frm.doc.rental_duration === "Month") {
						row.rate = item.monthly_rate || 0;
					}

					calculate_row_amount(frm, row);

					frm.refresh_field("items");
					frm.trigger("calculate_totals");
				}
			}
		});
	},

	qty(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		calculate_row_amount(frm, row);
		frm.refresh_field("items");
		frm.trigger("calculate_totals");
	},

	rate(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		calculate_row_amount(frm, row);
		frm.refresh_field("items");
		frm.trigger("calculate_totals");
	}
});


function calculate_row_amount(frm, row) {

	if (frm.doc.rental_duration === "Days") {
		if (frm.doc.start_date && frm.doc.end_date) {
			let days = frappe.datetime.get_diff(frm.doc.end_date, frm.doc.start_date) + 1;
			row.amount = (row.rate || 0) * (row.qty || 0) * days;
		} else {
			row.amount = (row.rate || 0) * (row.qty || 0);
		}
	}

	else {
		row.amount = (row.rate || 0) * (row.qty || 0);
	}
}
