# Copyright (c) 2025, me and contributors
# For license information, please see license.txt

from frappe.model.document import Document
import frappe
from frappe.model.mapper import get_mapped_doc


class HireAgreement(Document):
	pass



@frappe.whitelist()
def make_sales_order(source_name, target_doc=None):
	def set_missing_values(source, target):
		target.agreement_reference = source.name
		target.delivery_date = source.start_date

	return get_mapped_doc(
		"Hire Agreement",
		source_name,
		{
			"Hire Agreement": {
				"doctype": "Sales Order",
				"field_map": {"customer": "customer"}
			},
			"Items": {
				"doctype": "Sales Order Item",
				"field_map": {
					"item": "item_code",
					"qty": "qty",
					"rate": "rate"
				}
			}
		},
		target_doc,
		set_missing_values
	)
