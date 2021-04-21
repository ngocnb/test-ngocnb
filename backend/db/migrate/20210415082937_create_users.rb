class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: true
      t.string :name, null: true
      t.string :uid, null: true
      t.string :token, null: true
      t.string :password, null: true

      t.timestamps
    end
  end
end
