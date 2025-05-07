import { kot_access_token, accesstoken } from "./constants"
export const getAccessToke = () => {
  return localStorage.getItem(accesstoken)
}
export const getKOTAccessToke = () => {
  return localStorage.getItem(kot_access_token)
}
export const getWaiterAccessToke = () => {
  return localStorage.getItem('waiter_access_token')
}
export const setAccessToke = (value) => {
  localStorage.setItem(accesstoken, value)
}
export const get_item_type = (number) => {
  const type = {
    1: 'KG',
    2: 'Liter',
    3: 'Pic'
  }
  return type[number]
}
export function getMonthNumber(date) {
  const monthNumber = date.getMonth() + 1;
  return monthNumber;
}

export function getMonthAndYear_string(current_date) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[current_date.getMonth()];
  const year = current_date.getFullYear();
  return `${monthName} ${year}`;
}

export function getYear_by_date(current_date) {
  const year = current_date.getFullYear();
  return year;
}