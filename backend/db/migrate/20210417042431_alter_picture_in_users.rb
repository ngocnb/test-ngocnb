class AlterPictureInUsers < ActiveRecord::Migration[5.2]
  def up
    change_column :users, :picture, :string, :limit => 1000
  end

  def down
    change_column :users, :picture, :string, :limit => 255
    end
end
