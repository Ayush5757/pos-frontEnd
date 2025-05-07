import React, {
  useEffect,
  useState,
} from "react";
import DrawerCustome from "../../components/DrawerCustome";
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Loader,
  Modal,
  Paper,
  ScrollArea,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { ImageCard } from "../ShopMainPage/MenuCard/CardCustome";
import { TextInputView, TextInputViewNormal } from "../../components/Inputs";
import { useStyles } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMenuItems,
} from "../../services/api/inventory";

import { useSelector, useDispatch } from "react-redux";
import { shoeNotification } from "../../components/Notify";
import { Formik, Form } from "formik";
import { TextN1 } from "../../components/Text";
import { useDisclosure } from "@mantine/hooks";
import { PrimaryButton } from "../../components/Buttons";

import { AddCustomerInfoFastInventorie, AddFastInventorieItem, AddFullInventorie, AddNoteFastInventorie, ChangePlateSizeFastInventorie, ChangeQtyFastInventorie, RemoveAddOnChargesFastOrder, RemoveEntireFastInventorie, RemoveFastInventorieItem, RemoveOnlineOrder } from "../../redux/FastOrderInventorie";
import FastOrderCustomeTable from "../../components/Tables/FastOrderCustomeTable";
import { debounce } from "lodash";
import { complete_fast_inventorie, save_fast_inventorie, send_kot_to_kitchen } from "../../services/api/fastInventorie";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const FasteOrderContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formikRef = React.useRef();
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const [categoryID, setCategoryID] = useState();
  const [openNotes, setOpenNotes] = useState(false);
  const [isChangeQtyUp, setIsChangeQtyUp] = useState(null);
  const [isChangePlateType, setIsChangePlateType] = useState(null);
  const [currentTotal, setCurrentTotal] = useState({total:0, total_with_GST:0});
  const [currentDiscount, setCurrentDiscount] = useState(0);
  const [isOnlineOrder, setisOnlineOrder] = useState(0);
  const [searchItem, setSearchItem] = useState();
  const [showMenuImage, setshowMenuImage] = useState(localStorage.getItem("showI"));

  const fast_inventorie_items = useSelector(
    (state) => state?.FastOrderInventorieReducer?.FastInventorieItems
    );
    useEffect(()=>{
      if(location?.state){
        dispatch(AddFullInventorie(location?.state))
      }
    },[])
    
    useEffect(()=>{
      if(fast_inventorie_items?.discount){
        setCurrentDiscount(fast_inventorie_items?.discount)
      }
    },[fast_inventorie_items])

  useEffect(()=>{
    if(fast_inventorie_items?.onlineOrder){
      setisOnlineOrder(fast_inventorie_items?.onlineOrder);
    }
  },[fast_inventorie_items])
    
  useEffect(()=>{
    if(fast_inventorie_items?.inventories?.length){
      let total = 0;
      fast_inventorie_items?.inventories?.forEach((val)=>{
       let temp =  val?.plate_type === '1'? val?.qty * val?.price : val?.qty * val?.half_price
       total = total + temp;
      })
      if(fast_inventorie_items?.addOnCharges?.length!==0){
        let temp = 0;
        fast_inventorie_items?.addOnCharges?.forEach((val)=>{
          temp = temp + val?.charge_price;
        })
        let data = {
          total: total,
          total_with_GST: (parseInt((total + (total * 18) / 100)  - currentDiscount)) + temp
        }
        setCurrentTotal({...data})
      }else{
        let data = {
          total: total,
          total_with_GST: (parseInt((total + (total * 18) / 100)  - currentDiscount))
        }
        setCurrentTotal({...data})
      }
    }
  },[fast_inventorie_items,currentDiscount])

  
  const { data: menuData, refetch: menuLoad,isFetching } = useQuery({
    queryKey: ["getMenuItems", categoryID,searchItem],
    queryFn: () =>
      getMenuItems(
        localStorage.getItem("shop_user_id"),
        categoryID,searchItem
      ),
    enabled: false,
  });
  

  useEffect(() => {
    if (categoryID || searchItem) {
      menuLoad();
    }
  }, [categoryID, searchItem]);

  const CategoryHandelClick = (id) => {
    close();
    setCategoryID(id);
  };
 
  const ChangeQtyHandler = (index) => {
    setIsChangeQtyUp(index+1);
  };
  const ChangePLateTypeHandler = (index) => {
    setIsChangePlateType(index+1);
  };
  const removeFastInventryAction = (index)=>{
    dispatch(RemoveFastInventorieItem(index))
  }

  const debouncedHandlerCustomerName = debounce((value) => {
    dispatch(AddCustomerInfoFastInventorie({field: 'name' ,value:value}))
  }, 200);
  
  const debouncedHandlerCustomerPhone = debounce((value) => {
    dispatch(AddCustomerInfoFastInventorie({field: 'phone' ,value:value}))
  }, 200);
  
  const debouncedHandlerCustomerAddres = debounce((value) => {
    dispatch(AddCustomerInfoFastInventorie({field: 'address' ,value:value}))
  }, 200);
  
  const order_complete = useMutation({
    mutationFn: (newVal) => complete_fast_inventorie(newVal),
  });

  const order_save = useMutation({
    mutationFn: (newVal) => save_fast_inventorie(newVal),
  });
 
  const structuresWathsData = ()=>{
    let str = '';
    fast_inventorie_items?.inventories?.forEach((val, index) => {
      if(index ===0){
        str = `Food Bill🎉%0A*${localStorage.getItem('shopName')}*%0AThankYou For Visiting Us 🥰%0A%0A-------------------------------%0A${index + 1}) ${
          val?.item_name
        } , ${
          val?.plate_type==='1'?`${val?.price} ₹`:`${val?.half_price} ₹ (H)`
        } ,  qty - ${val?.qty}%0A`;
      }else{
        str = str +`%0A${index + 1}) ${val?.item_name} , ${
          val?.plate_type==='1' ? `${val?.price} ₹`:`${val?.half_price} ₹ (H)`
        } , qty - ${val?.qty}%0A`;
      }
    });
    if(currentTotal?.total_with_GST){
      if(currentDiscount > 0){
        str = str + `-------------------------------%0A%0ACurrent Total - ${currentTotal?.total} ₹ %0ACGST - ${
          (currentTotal?.total * 9) / 100
        } ₹ %0ASGST - ${
          (currentTotal?.total * 9) / 100
        } ₹ %0ADiscount Amount - ${
          currentDiscount} ₹`;
          //  %0AYour Total - ${parseInt(currentTotal?.total_with_GST)} ₹%0AI hope you're having a great time byeee 🤗` 
      }else{
        str = str + `-------------------------------%0A%0ACurrent Total - ${currentTotal?.total} ₹ %0ACGST - ${
          (currentTotal?.total * 9) / 100
        } ₹ %0ASGST - ${
          (currentTotal?.total * 9) / 100
        } ₹`;
      }
      if(fast_inventorie_items?.addOnCharges?.length>0){
        fast_inventorie_items?.addOnCharges?.forEach((val)=>{
          str = str + `%0A${val?.charge_name} - ${val?.charge_price} ₹`
        })
      }
      str = str + `%0A%0A*Your Total* - ${currentTotal?.total_with_GST} ₹%0A%0A*I hope you're having a great time byeee* 🤗`;
    }
    return str;
  }

  const SaveFastOrder = async()=>{
    try {
      let temp = {...fast_inventorie_items}
      temp['shopID'] = localStorage.getItem("shop_user_id");
      temp['order_status'] = 5;
      temp['total'] = parseInt(currentTotal?.total_with_GST);
      temp['discount'] = currentDiscount;
      temp['onlineOrder'] = isOnlineOrder;
      if(!temp?.customer?.name && !temp?.customer?.phone && !temp?.customer?.address){
        delete temp?.customer;
      }
      if(!temp?.note){
        delete temp?.note;
      }
      await order_save.mutateAsync(temp, {
        onSuccess: (res) => {
          dispatch(AddFullInventorie(res?.data?.target))
          shoeNotification("success", "Order Saved Successfully");
        },
      });
    } catch (error) {
      shoeNotification("error", "Somthing went wrong...");
    }
  }
  
  const handelDone = ()=>{
    dispatch(RemoveEntireFastInventorie())
    setCurrentTotal({total:0, total_with_GST:0})
    setCurrentDiscount(0);
  }
  const sendKotToKitchen = useMutation({
    mutationFn: (newVal) => send_kot_to_kitchen(newVal),
  });
  const handelKot = async ()=>{ 
    try {
      if(fast_inventorie_items?._id){
        let temp = {
          order_id : fast_inventorie_items?._id
        }
        await sendKotToKitchen.mutateAsync(temp, {
          onSuccess: () => {
            shoeNotification("success", "Order sended to kot Successfully");
          },
        });
      }else{
        shoeNotification("error", "Please Save First To Send KOT");
      }
    } catch (error) {
      shoeNotification("error", "Somthing went wrong...");
    } 
  }

  const debounceSearchItems = debounce((value) => {
    setSearchItem(value)
  }, 1000);
  return (
    <Box pt={5}>
      <Grid gutter={0}  w={"100%"}>
        <Grid.Col span={2} sm={1} lg={1}>
          <DrawerCustome
            opened={opened}
            open={open}
            close={close}
            CategoryHandelClick={CategoryHandelClick}
          />
        </Grid.Col>
        <Grid.Col span={2} sm={3}>
          <Button
            variant="gradient"
            gradient={{ from: "#1a75ff", to: "#800080", deg: 105 }}
            onClick={() => navigate("/shop-tables-inventory")}
          >
            Tables
          </Button>
        </Grid.Col>
        <Grid.Col span={8} sm={8} className={classes.lastTabGrid}>
          <Box className={classes.selectGrid} ml={10}>
            <Select 
              id={"onlineOrder"}
              name={"onlineOrder"}
              placeholder={"Quick Order"}
              className={classes.onlineOrderSelect}
              clearable
              value={isOnlineOrder}
              onChange={(value) => {
                if(value !== null){
                  setisOnlineOrder(value)
                }else{
                  setisOnlineOrder(0)
                }
              }}
              data={[
                { value: 1, label: "Zomato" },
                { value: 2, label: "Swigy" },
              ]}
              ml={10}
            />
            {isOnlineOrder===1?<TextN1 ml={10} className={classes.zomato}>Zomato</TextN1>:isOnlineOrder===2&&<TextN1 ml={10} className={classes.swigy}>Swigy</TextN1>}
          </Box>
          <ActionIcon
            variant="filled" color="lime" size="md" radius="md" mr={10} onClick={()=>{
              if(fast_inventorie_items?.customer?.phone){
                window.open(`whatsapp://send?phone=${fast_inventorie_items?.customer?.phone}&text=${structuresWathsData()}`,'_blank')
              }else{
                shoeNotification('error','Number Not Found')
              }
              }}
              ml={5}>
              <IconBrandWhatsapp />
            </ActionIcon>
        </Grid.Col>
       
      </Grid>

      <Grid gutter={10} >
        <Grid.Col span={12} lg={6} className={classes.leftGrid}>
          <ScrollArea w={"100%"} p={0} mah={"70vh"}>
            <Grid gutter={10} w={"100%"}>
            <Grid.Col span={12} mt={10}>
              <Box className={classes.searchItemGrid}>
                <TextInputViewNormal 
                  onChange={(e)=>debounceSearchItems(e.target.value)}
                  placeholder='Search Items'
                />
              </Box>
            </Grid.Col>
              {isFetching ? (
                <Box className={classes.categoryEmptyBox}>
                  <Loader />
                </Box>
              ) : (
                <>
                  {!isFetching && menuData?.data?.target?.length ? (
                    <>
                      {menuData?.data?.target?.map((val) => (
                        <Grid.Col
                        span={4}
                        sm={3}
                        lg={2}
                          className={classes.items}
                          onClick={() => {
                            dispatch(AddFastInventorieItem(val))
                          }}
                        >
                          {(showMenuImage === "1" && val?.photoURL) ? (
                             <ImageCard
                             image={val?.photoURL}
                             title={val?.item_name}
                             comments={val?.price?`Price - ${val?.price} ₹`:null}
                             comments2={val?.half_price?`Half - ${val?.half_price} ₹`:null}
                           />
                          ) : (
                            <Box className={classes.CardProduct}>
                            <Text className={classes.product_item}>{val?.item_name}</Text>
                            {val?.price && <Text className={classes.product_price}>{`Price - ${val?.price} ₹`}</Text>}
                            {val?.half_price && <Text className={classes.product_price}>{`Half - ${val?.half_price} ₹`}</Text>}
                          </Box>
                          )}
                        </Grid.Col>
                      ))}
                    </>
                  ) : (
                    <Box className={classes.categoryEmptyMsgBox}>
                      <TextN1 className={classes.NoCatSelec}>
                        No Record Found
                      </TextN1>
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </ScrollArea>


          <Grid
            gutter={5}
            w={"100%"}
            ml={1}
            mah={"15vh"}
            className={classes.extraChargeGrid}
          >
            {fast_inventorie_items?.addOnCharges?.map((val) => (
              <>
                <Grid.Col
                 span={4} 
                 sm={2}
                  ml={5}
                  className={classes.addOnChargeGrid}
                  p={5}
                >
                  <TextN1 className={classes.chargeName}>
                    {val?.charge_name}
                  </TextN1>
                  <TextN1 className={classes.chargeValue} ml={5}>
                    {val?.charge_price} ₹
                  </TextN1>
                </Grid.Col>
              </>
            ))}
            <Grid.Col
              span={2}
              sm={1}
              ml={10}
              className={classes.addOnChargeGridClear}
              p={5}
            >
               {fast_inventorie_items?.addOnCharges && fast_inventorie_items?.addOnCharges?.length !== 0 && (
                <PrimaryButton
                  onClick={() => {
                    dispatch(RemoveAddOnChargesFastOrder());
                  }}
                  className={classes.chargeName}
                >
                  Clear
                </PrimaryButton>
              )}
            </Grid.Col>
            </Grid>

        </Grid.Col>
        <Grid.Col span={12} lg={6} mt={2}>
          <Paper shadow="xl" className={classes.RightSection}>
            <Formik
              initialValues={(fast_inventorie_items && fast_inventorie_items?.customer) ? fast_inventorie_items?.customer:{name:'',phone:'',address:''} }
              onSubmit={async () => {
                try {
                  if(fast_inventorie_items?._id){
                    let temp = {order_id: fast_inventorie_items?._id}
                    await order_complete.mutateAsync(temp, {
                      onSuccess: () => {
                        dispatch(RemoveEntireFastInventorie())
                        setisOnlineOrder(()=>0)
                        setCurrentTotal({total:0, total_with_GST:0})
                        setCurrentDiscount(0);
                        shoeNotification("success", "Order Complete Successfully");
                      },
                    });
                  }else{
                    shoeNotification("error", "Please Save First To Complete This Order");
                  }
                  
                } catch (error) {
                  shoeNotification("error", "Somthing went wrong...");
                }
              }}
              enableReinitialize
              innerRef={formikRef}
            >
              {({ values, setFieldValue, handleChange, errors }) => (
                <Form>
                  <Grid gutter={5}>
                    <Grid.Col span={6} md={4}>
                      <TextInputView
                        id={"name"}
                        name={"name"}
                        label={"Customer Name"}
                        onChange={(e)=>{
                          setFieldValue('name',e?.target?.value)
                          debouncedHandlerCustomerName(e?.target?.value)
                        }}
                        placeholder={"Enter Name"}
                        value={values?.name??''}
                      />
                    </Grid.Col>
                    <Grid.Col span={6} md={4}>
                      <TextInputView
                        id={"phone"}
                        name={"phone"}
                        label={"Customer Phone"}
                        onChange={(e)=>{
                          setFieldValue('phone',e?.target?.value)
                          debouncedHandlerCustomerPhone(e?.target?.value);
                        }}
                        placeholder={"Enter Phone"}
                        value={values?.phone??''}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} md={4}>
                      <TextInputView
                        id={"address"}
                        name={"address"}
                        label={"Customer Address"}
                        onChange={(e)=>{
                          setFieldValue('address',e?.target?.value)
                          debouncedHandlerCustomerAddres(e?.target?.value)
                        }}
                        placeholder={"Enter Address"}
                        value={values?.address??''}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <FastOrderCustomeTable
                        formikRef={formikRef}
                        tdata={fast_inventorie_items?.inventories}
                        tnote={fast_inventorie_items?.note ??  null}
                        fast_inventorie_items = {fast_inventorie_items}
                        tableHeight={"45vh"}
                        currentTotal={currentTotal}
                        setOpenNotes={setOpenNotes}
                        removeInventryAction={removeFastInventryAction}
                        ChangeQtyHandler={ChangeQtyHandler}
                        ChangePLateTypeHandler={ChangePLateTypeHandler}
                        currentDiscount={currentDiscount}
                        setCurrentDiscount={setCurrentDiscount}
                        SaveFastOrder = {SaveFastOrder}
                        handelDone = {handelDone}
                        handelKot = {handelKot}
                      />
                    </Grid.Col>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid.Col>
      </Grid>

      <Modal
        opened={isChangeQtyUp}
        onClose={() => setIsChangeQtyUp(null)}
        title={`Change in Qty`}
        size={"sm"}
        className={classes.model}
        centered
      >
        <Formik
          initialValues={{ qty: 1 }}
          onSubmit={(val) => {
            if(isChangeQtyUp){
              dispatch(ChangeQtyFastInventorie({item_index: isChangeQtyUp - 1 , qty: val?.qty }));
            }
            setIsChangeQtyUp(null);
          }}
        >
          {({ values, handleChange, errors }) => (
            <Form>
              <TextInputView
                id={"qty"}
                name={"qty"}
                label={"Add Item Qty"}
                onChange={handleChange}
                placeholder={"qty"}
                value={values?.qty}
                type={"number"}
              />
              <PrimaryButton mt={10} type="submit">
                add
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        opened={isChangePlateType}
        onClose={() => setIsChangePlateType(null)}
        title={`Change Plate Size`}
        className={classes.plate_type_modal}
        centered
      >
        <Formik
          initialValues={{ plate_type: '1' }}
          onSubmit={(val) => {
            if(isChangePlateType){
              dispatch(ChangePlateSizeFastInventorie({item_index: isChangePlateType - 1, plate_type: val?.plate_type}))
            }
           setIsChangePlateType(null)
          }}
          enableReinitialize
        >
          {({ values, handleChange, errors ,setFieldValue}) => (
            <Form>
              <Select
                id={"plate_type"}
                name={"plate_type"}
                label={"Plate Size"}
                onChange={(value)=>{
                  setFieldValue('plate_type',value)
                }}
                data={[
                  { value: '1' , label: 'Full Plate'},
                  { value: '2' , label: 'Half Plate'}
                ]}
                value={values?.plate_type}
              />
              <PrimaryButton mt={10} type="submit">
                add
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        opened={openNotes}
        onClose={() => setOpenNotes(false)}
        title="Notes"
        size={"xl"}
        className={classes.model}
        centered
      >
        <Formik
          initialValues={{
            note: fast_inventorie_items?.note ?? ''
          }}
          onSubmit={(val) => {
            dispatch(AddNoteFastInventorie(val?.note))
            setOpenNotes(false);
          }}
        >
          {({ values, setFieldValue, handleChange, errors }) => (
            <Form className={classes.customeform}>
              <Textarea
                id="note"
                name="note"
                placeholder="Enter Notes"
                label="Order Notes"
                radius="md"
                size="md"
                onChange={handleChange}
                value={values?.note ?? ""}
              />
              <PrimaryButton mt={20} type="submit">
                Add Note
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Modal>

    </Box>
  );
};

export default FasteOrderContainer;
