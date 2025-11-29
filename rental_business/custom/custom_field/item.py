def get_item_custom_fields():
	'''
	Custom fields that need to be added to the Item Doctype
	'''
	return {
		"Item": [
			{
				"fieldname": "is_rental_item",
				"fieldtype": "Check",
				"label": "Is Rental Item",
				"insert_after": "stock_uom"
			},
			{
				"fieldname": "daily_rate",
				"fieldtype": "Int",
				"label": "Daily Rate",
				"insert_after": "is_rental_item"
			},
			{
				"fieldname": "weekly_rate",
				"fieldtype": "Int",
				"label": "Weekly Rate",
				"insert_after": "daily_rate"
			},
			{
				"fieldname": "monthly_rate",
				"fieldtype": "Int",
				"label": "Monthly Rate",
				"insert_after": "weekly_rate"
			}
		]
	}
 