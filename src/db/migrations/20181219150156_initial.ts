import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.string('user_hash');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('locations', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.string('location_name');
      table.float('latitude');
      table.float('longitude');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('user_locations', (table) => {
      table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.uuid('user_id');
      table.foreign('user_id').references('users.id');
      table.uuid('location_id');
      table.foreign('location_id').references('locations.id');
      table.integer('visit_count');
      table.timestamps(true, true);
    }),
  ]);
}

export async function down(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.dropTable('user_locations'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('locations'),
  ]);
}
