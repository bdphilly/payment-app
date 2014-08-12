class AddRankToPayee < ActiveRecord::Migration
  def change
    add_column :payees, :rank, :integer
  end
end
