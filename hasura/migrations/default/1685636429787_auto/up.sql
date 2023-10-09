ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_curriculum_id_fkey FOREIGN KEY (curriculum_id) REFERENCES public.curriculums(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.curriculum_skills
    ADD CONSTRAINT curriculum_skills_curriculum_id_fkey FOREIGN KEY (curriculum_id) REFERENCES public.curriculums(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.curriculum_skills
    ADD CONSTRAINT curriculum_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.curriculums
    ADD CONSTRAINT curriculums_skill_ids_fkey FOREIGN KEY (skill_ids) REFERENCES public.skills(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_skills
    ADD CONSTRAINT project_skills_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_skills
    ADD CONSTRAINT project_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT project_users_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT project_users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT project_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_chapter_id_fkey FOREIGN KEY (chapter_id) REFERENCES public.chapters(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.types(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_record_id_fkey FOREIGN KEY (record_id) REFERENCES public.records(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_bureau_id_fkey FOREIGN KEY (bureau_id) REFERENCES public.bureaus(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_grade_id_fkey FOREIGN KEY (grade_id) REFERENCES public.grades(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.types(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
