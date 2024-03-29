class UserDetail < ApplicationRecord
  belongs_to :user
  belongs_to :grade
  belongs_to :department
  belongs_to :bureau
  belongs_to :type

  def to_info_h
    return {
      "id": self.id,
      "user_id": self.user.id,
      "department": self.department,
      "grade": self.grade,
      "bureau": self.bureau,
      "icon_name": self.icon_name,
      "github": self.github,
      "slack": self.slack,
      "biography": self.biography,
      "pc_name": self.pc_name,
      "pc_os": self.pc_os,
      "pc_cpu": self.pc_cpu,
      "pc_ram": self.pc_ram,
      "pc_storage": self.pc_storage,
      "type": self.type,
    }
  end
end
