import { formatDate } from '@utils/format_date';

export const SKILL_COLUMNS = [
  {
    name: 'Name',
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: 'Category',
    selector: (row: any) => row.category_name,
    sortable: true,
  },
  {
    name: 'Type',
    selector: (row: any) => row.type_name || '',
    sortable: true,
  },
  {
    name: 'Date',
    selector: (row: any) => formatDate(row.created_at),
    sortable: true,
  },
];

export const RECORD_COLUMNS = [
  {
    name: 'Student / Teacher',
    selector: (row: any) => `${row.user_name} / ${row.teacher_name}`,
    sortable: true,
  },
  {
    name: 'Title',
    selector: (row: any) => row.title,
    sortable: true,
  },
  {
    name: 'Skill',
    selector: (row: any) => {
      if (!row.skills) return '';
      return row.skills
        .sort((a: any, b: any) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        .map((skill: any) => skill.name)
        .join(', ');
    },
    sortable: true,
  },
  {
    name: 'Curriculum / Chapter',
    cell: (row: any) => (row.curriculum_title ? `${row.curriculum_title} / ${row.chapter_title}` : ''),
    sortable: true,
  },
  {
    name: 'Date',
    selector: (row: any) => formatDate(row.created_at),
    sortable: true,
  },
];

export const CATEGORY_COLUMNS = [
  {
    name: 'Name',
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: 'Detail',
    selector: (row: any) => row.detail,
    sortable: true,
  },
  {
    name: 'Date',
    selector: (row: any) => formatDate(row.created_at),
    sortable: true,
  },
];

export const CURRICULUM_COLUMNS = [
  {
    name: 'Title',
    selector: (row: any) => row.curriculum.title,
    sortable: true,
  },
  {
    name: 'skills',
    selector: (row: any) => {
      const skills = row.skills.sort((a: any, b: any) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      return skills.map((skill: any) => skill.name).join(', ');
    },
    sortable: true,
  },
  {
    name: 'Date',
    selector: (row: any) => formatDate(row.curriculum.created_at),
    sortable: true,
  },
];
