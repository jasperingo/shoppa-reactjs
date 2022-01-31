
import Icon from "@mdi/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { categoryIcon, editIcon, favoritedIcon, favoriteIcon, weightIcon } from "../../assets/icons";
import { useMoneyFormat } from "../../hooks/viewHook";
//import { CART } from "../../context/AppActions";
import AlertDialog from "../dialog/AlertDialog";
import H4Heading from "../H4Heading";
import QuantityChooser from "../QuantityChooser";


export default function ProductProfile(
  { 
    isCustomer, 
    isStore,
    customerToken,
    product: {
      id,
      photo,
      title,
      description,
      sub_category,
      favorites,
      store,
      product_variants
    }
  }
) {

  const { t } = useTranslation();

  //const { cartDispatch } = useAppContext();
  
  const [dialog, setDialog] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [variant, setVariant] = useState(product_variants[0]);

  const price = useMoneyFormat(variant?.price || 0);
  
  function onQuantityButtonClicked(value) {
    value = (quantity || 1) + value;
    setQuantity(value < 1 ? 1 : value);
  }

  function onAddToCart() {
    
    // cartDispatch({
    //   type: CART.ITEM_ADDED,
    //   payload: {
    //     amount: (product.price*quantity),
    //     delivery_fee: 200.00,
    //     unit: product.unit,
    //     quantity,
    //     product
    //   }
    // });

    setDialog({
      body: '_product.Product_has_been_added_to_cart',
      positiveButton: {
        text: '_extra.Done',
        action() {
          setDialog(null);
        }
      }
    });
  }

  function favoriteProduct() {
    alert('Adding product to favourites');
  }

  function unfavoriteProduct() {
    alert('Removing product from favourites');
  }

  function confirmUnfavoriteProduct() {
    setDialog({
      body: '_product._remove_product_from_favorites_confirm_message',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          setDialog(null);
          unfavoriteProduct();
        }
      },
      negativeButton: {
        text: '_extra.No',
        action() {
          setDialog(null);
        }
      }
    });
  }

  return (
    <div className="md:container mx-auto">
      <div className="sm:mt-4 lg:flex lg:items-start lg:gap-2">

        <div className="lg:w-1/3">
          <div className="container mx-auto">
            <img 
              src={photo.href}
              alt={title}
              className="h-60 w-full lg:h-96 sm:rounded"
              />
          </div>
        </div>

        <div className="container-x py-4 flex-grow lg:w-1/2 lg:pt-0">

          { dialog && <AlertDialog dialog={dialog} /> }

          <div className="flex">
            <h3 className="text-xl flex-grow">{ title }</h3>
            <div>
              {
                isCustomer && (customerToken === null || !favorites?.length) && 
                <button onClick={favoriteProduct}>
                  <span className="sr-only">{ t('_product.Add_product_to_favorites') }</span>
                  <Icon path={favoriteIcon} className="w-8 h-8 text-red-500" />
                </button>
              }

              {
                isCustomer && customerToken !== null && favorites?.length > 0 && 
                <button onClick={confirmUnfavoriteProduct}>
                  <span className="sr-only">{ t('_product.Remove_product_from_favorites') }</span>
                  <Icon path={favoritedIcon} className="w-8 h-8 text-red-500" />
                </button>
              }

              { 
                isStore && 
                <Link to={`/product/${id}/update`} className="inline-block btn-color-primary p-1 rounded-md">
                  <span className="sr-only">{ t('_product.Edit_product') }</span>
                  <Icon path={editIcon} className="w-7 h-7" />
                </Link>
              }
            </div>
          </div>
          
          <div className="flex gap-1 items-center text-color-gray text-sm mb-3">
            <Icon path={categoryIcon} className="w-5 h-5" />
            <span>{ sub_category.name }, { sub_category.category.name }</span>
          </div>
          
          <ul className="flex gap-2 overflow-x-auto mb-3">
            {
              product_variants.map(v=> (
                <li key={`product-variant-${v.id}`}>
                  <button 
                    onClick={()=> setVariant(product_variants.find(theVar=> v.id === theVar.id))}
                    className={`px-2 rounded ${v.id === variant.id ? 'btn-color-primary' : 'bg-color-gray hover:bg-color-gray-h'}`}
                    >
                    { v.name }
                  </button>
                </li>
              ))
            }
          </ul>
          
          {
            variant && 
            <>
              <div className="font-bold text-2xl text-color-primary mb-2 flex-grow">{ price }</div>

              <div className="flex gap-2 items-center flex-wrap mb-3">
                {
                  variant.available && 
                  <>
                    <div className="text-sm">{ t('_product.Quantity') }</div>
                    <QuantityChooser
                      quantity={quantity}
                      onQuantityChanged={onQuantityButtonClicked}
                      />
                  </>
                }
                <div className="bg-color-gray px-2 rounded text-sm">
                  { t('_product._unit_quauntity_available', { unit: variant.quantity }) }
                </div>
              </div>

              <div className="flex gap-1 items-center text-color-gray text-sm mb-2">
                <Icon path={weightIcon} className="w-5 h-5" />
                <span>{ variant.weight } kg</span>
              </div>
              
              {
                variant.available && 
                <button 
                  onClick={onAddToCart}
                  className="w-full btn-color-primary my-4 py-3 px-5 font-bold rounded lg:w-auto"
                  >
                  { t('_product.Add_to_cart') }
                </button>
              }
              
            </>
          }

        </div>

      </div>
      
      <div className="my-2 lg:my-5 lg:flex lg:items-start lg:gap-10">

        <div className="p-2 shadow rounded mb-3 flex-grow">
          <H4Heading text="_extra.Description" />
          <p className="max-h-40 overflow-auto">{ description }</p>
        </div>

        <div className="md:p-2 md:shadow">
          <H4Heading text="_store.Store" />
          <Link 
            to={`/store/${store.id}`} 
            className="flex gap-2 bg-color items-center hover:bg-color-gray-h md:block"
            >
            <img 
              src={ store.user.photo.href } 
              alt={ store.user.name } 
              className="w-12 h-12 border rounded block md:w-full md:h-36" 
              />
            <div className="font-bold flex-grow md:p-2">{ store.user.name }</div>
          </Link>   
        </div>

      </div>

    </div>
  );
}

