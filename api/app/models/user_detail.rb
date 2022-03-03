class UserDetail < ApplicationRecord
  belongs_to :user
  belongs_to :grade
  belongs_to :department
  belongs_to :bureau

  def to_info_h
    return {
      "user_detail_id": self.id,
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
    }
  end
end
