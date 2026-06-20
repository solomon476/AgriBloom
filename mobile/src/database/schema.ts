import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'farms',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'location', type: 'string', isOptional: true },
        { name: 'size_hectares', type: 'number', isOptional: true },
        { name: 'user_id', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'plots',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'size_hectares', type: 'number', isOptional: true },
        { name: 'crop_type', type: 'string', isOptional: true },
        { name: 'status', type: 'string' },
        { name: 'farm_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'crop_cycles',
      columns: [
        { name: 'crop_name', type: 'string' },
        { name: 'planted_date', type: 'number' },
        { name: 'expected_harvest', type: 'number', isOptional: true },
        { name: 'actual_harvest', type: 'number', isOptional: true },
        { name: 'yield_quantity', type: 'number', isOptional: true },
        { name: 'yield_unit', type: 'string', isOptional: true },
        { name: 'status', type: 'string' },
        { name: 'plot_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
})
