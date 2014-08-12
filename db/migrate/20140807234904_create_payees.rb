class CreatePayees < ActiveRecord::Migration
  def change
    create_table :payees do |t|
      t.string :name
      t.string :address

      t.timestamps
    end
  end
end
