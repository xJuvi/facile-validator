import * as causes from '@/types/error-cause';

export default {
  [causes.ACCEPTED]: 'لطفا این فیلد را تیک بزنید',
  [causes.MAX_LENGTH]: 'حداکثر طول مجاز این فیلد $1 است',
  [causes.MIN_LENGTH]: 'حداقل طول مجاز این فیلد $1 است',
  [causes.NUMBER]: 'لطفا یک عدد معتبر وارد کنید',
  [causes.BETWEEN]: 'لطفا یک عدد بین $1 و $2 وارد کنید',
  [causes.GREATER_EQUAL]: 'لطفا یک عدد بزرگتر یا مساوی $1 وارد کنید',
  [causes.LESS_EQUAL]: 'لطفا یک عدد کوچکتر یا مساوی $1 وارد کنید',
  [causes.DIGITS]: 'مقدار این فیلد باید $1 رقم باشد',
  [causes.EMAIL]: 'لطفا یک آدرس ایمیل معتبر وارد کنید',
  [causes.STARTS_WITH]: 'مقدار این فیلد باید با "$1" شروع شود',
  [causes.ENDS_WITH]: 'مقدار این فیلد باید با "$1" پایان داده شود',
  [causes.INTEGER]: 'مقدار این فیلد باید یک عدد صحیح باشد',
  [causes.REQUIRED]: 'این فیلد الزامی است',
  [causes.WITHIN]: 'مقدار این فیلد نادرست است',
};
