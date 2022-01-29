
import React from 'react'
import { Link } from 'react-router-dom';
import { useCategoryColor } from '../../context/AppHooks';

export default function CategoryItem({ canEdit, category, index, sub, path, grid }) {

  const iconColor = useCategoryColor(index);

  const fullPath = sub ? `/search/${path}?sub_category=${category.id}` : `/category/${category.id}`;

  return (
    <li className="mb-2">
      <Link 
        to={canEdit ? `/sub-category/${category.id}/update` : fullPath} 
        className={`${grid ? 'text-center' : 'flex'} flex-grow items-center gap-2 bg-color py-2 rounded md:px-2 md:py-3 md:shadow md:block md:text-center hover:bg-color-gray-h ${iconColor}`}
        >
        <img src={category.photo.href} alt={category.name} width="100" height="100" className="w-10 h-10 block mx-auto rounded" />
        <div className="text-sm flex-grow truncate overflow-ellipsis">{ category.name }</div>
      </Link>
    </li>
  );
}
