
import React from 'react'
import { useTranslation } from 'react-i18next';
import { categoryIcon } from '../../assets/icons';
import { useListFooter } from '../../hooks/viewHook';
import EmptyList from '../EmptyList';
import CategoryItem from '../list_item/CategoryItem';
import Loading from '../Loading';
import Reload from '../Reload';
import SingleList from './SingleList';

export default function CategoryList(
  { headerText, categories, categoriesLoading, categoriesLoaded, categoriesError, retryFetch }
) {

  const { t } = useTranslation();

  const listFooter = useListFooter();

  return (
    <div className="container-x py-2">
      <h3 className="font-bold my-2">{ t(headerText) }</h3>
      <SingleList
        data={categories}
        className="category-list"
        renderDataItem={(item, i)=> (
          <CategoryItem 
            key={`category-${item.id}`} 
            index={i}
            category={item} 
            grid={false}
            />
        )}
        footer={listFooter([
          { 
            canRender: categoriesLoading, 
            render() { 
              return <li key="category-footer" className="col-span-3"> <Loading /> </li>;
            }
          }, 
          { 
            canRender: categoriesError !== null, 
            render() { 
              return <li key="category-footer" className="col-span-3"> <Reload action={retryFetch} /> </li>;
            }
          },
          { 
            canRender: categoriesLoaded && categories.length === 0, 
            render() { 
              return <li key="category-footer" className="col-span-3"> <EmptyList text="_empty.No_category" icon={categoryIcon} /> </li>;
            }
          },
        ])}
        />
    </div>
  );
}
