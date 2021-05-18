import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import autoTable from 'jspdf-autotable';
import * as jsPDF from 'jspdf';
const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class DataService {
   authtoken = localStorage.getItem('authtoken');
  constructor(private http: HttpClient) { }

  
  login(data) {
    return this.http.post(url + '/user/login', data);
  }
  getsingleuser(id)
  {
    return this.http.get(url +`cobuserhdr/get?no=${id}&authenticationtoken=${this.authtoken}`);
  }
  getsinglecustomer(id)
  {
    return this.http.get(url +`custinfo/get?no=${id}`);
  }
  getUsers() {
    return this.http.get(url + `/cobuserhdr/get?authenticationtoken=${this.authtoken}`);
  }

  getUsersById(id) {
    return this.http.get(url + `/user/${id}`);
  }

  createUser(data) {
    return this.http.post(url + '/cobuserhdr/post', data);
  }

  updateUser(id, data) {
    return this.http.post(url + `/user/update/${id}`, data);
  }

  deleteUser(id) {
    return this.http.get(url + `/user/delete/${id}`);
  }

  getCustomers() {
    return this.http.get(url + `/custinfo/get?authenticationtoken=${this.authtoken}`);
  }

  getCustomerById(id) {
    return this.http.get(url + `/customer/${id}?authenticationtoken=${this.authtoken}`);
  }

  createCustomer(data) {
    return this.http.post(url + '/customer/create', data);
  }

  updateCustomer(id, data) {
    return this.http.post(url + `/customer/update/${id}`, data);
  }

  deleteCustomer(id) {
    return this.http.get(url + `/customer/delete/${id}`);
  }
  // ------------------------------------------------------------
  getAccounts() {
    return this.http.get(url + `/account`);
  }
  getcurrencyreport(data) {
    return this.http.post(url + `/currencyreport/`, data);
  }
  getAccountById(id) {
    return this.http.get(url + `/account/${id}`);
  }

  createAccount(data) {
    return this.http.post(url + '/account/create', data);
  }

  updateAccount(id, data) {
    return this.http.post(url + `/account/update/${id}`, data);
  }

  deleteAccount(id) {
    return this.http.get(url + `/account/delete/${id}`);
  }

  getSupplier() {
    return this.http.get(url + `/supplier`);
  }

  getSupplierById(id) {
    return this.http.get(url + `/supplier/${id}`);
  }

  createSupplier(data) {
    return this.http.post(url + '/supplier/create', data);
  }

  updateSupplier(id, data) {
    return this.http.post(url + `/supplier/update/${id}`, data);
  }

  deleteSupplier(id) {
    return this.http.get(url + `/supplier/delete/${id}`);
  }

  getCurrencies() {
    return this.http.get(url + `/currency`);
  }

  getCurrenyById(id) {
    return this.http.get(url + `/currency/${id}`);
  }

  createCurrency(data) {
    return this.http.post(url + '/currency/create', data);
  }

  updateCurrency(id, data) {
    return this.http.post(url + `/currency/update/${id}`, data);
  }

  deleteCurrency(id) {
    return this.http.get(url + `/currency/delete/${id}`);
  }

  // ---------------------------------------------------------------

  getSalesRecords() {
    return this.http.get(url + '/sale');
  }

  getSalesById(id) {
    return this.http.get(url + `/sale/${id}`);
  }

  createSale(data) {
    return this.http.post(url + '/sale/create', data);
  }

  updateSales(id, data) {
    return this.http.post(url + `/sale/update/${id}`, data);
  }

  deleteSales(id) {
    return this.http.get(url + `/sale/delete/${id}`);
  }

 // -------------------------------------------------------------------------
  getPurchaseRecords() {
    return this.http.get(url + '/purchase');
  }

  createPurchase(data) {
    return this.http.post(url + '/purchase/create', data);
  }
  exportPdf(column, data, name) {
    const doc = new jsPDF();
    doc.text(name + ' Report', 11, 8);
    autoTable(doc, {
      // styles: { halign: 'center', fillColor: [255, 0, 0] },
      head: column,
      body: data
      // columnStyles: { 0: { halign: 'center', fillColor: [255, 255, 255] } }
    });
    doc.save(name + '-Report.pdf');
  }
  // -----------------------------------------------------------
  getAccountTypeRecords() {
    return this.http.get(url + '/acctype');
  }

  getAccountTypeById(id) {
    return this.http.get(url + `/acctype/${id}`);
  }

  createAccountType(data) {
    return this.http.post(url + '/acctype/create', data);
  }

  updateAccountType(id, data) {
    return this.http.post(url + `/acctype/update/${id}`, data);
  }

  deleteAccountType(id) {
    return this.http.get(url + `/acctype/delete/${id}`);
  }

  // -----------------------------------------------------------

  private saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '-Report' + EXCEL_EXTENSION);
    });
  }

  // Export EXCEL XLSX file of approved deals /
  exportExcel(data, name?) {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, name);
    });
  }

  getStocks(data) {
    return this.http.post(url + '/stock', data);
  }

  getGeneralReport() {
    return this.http.get(url + '/journalentry');
  }

  getLedgerReport(id) {
    return this.http.get(url + `/ledger/cash/${id}`);
  }

  getCustomerReport(customer, accountId) {
    return this.http.get(url + `/ledger/customer/${customer}/${accountId}`);
  }

  getPayments() {
    return this.http.get(url + '/payment');
  }

  getPaymentById(id) {
    return this.http.get(url + `/payment/${id}`);
  }

  createPayment(data) {
    return this.http.post(url + '/payment/create', data);
  }

  updatePayment(id, data) {
    return this.http.post(url + `/payment/update/${id}`, data);
  }

  deletePayment(id) {
    return this.http.get(url + `/customer/delete/${id}`);
  }

  getLedgerReports( data) {
    return this.http.post(url + `/ledger`, data);
  }

  getItemGroup()
  {
    return this.http.get(url + `/itemgroupinfo/get`);
  }
  addoreditItemGroup(data)
  {
    return this.http.post(url + `/itemgroupinfo/post` , data);
  }
  getItemGroupById(id)
  {
    return this.http.get(url + `/itemgroupinfo/get?no=${id}`);
  }
  getBrands()
  {
    return this.http.get(url + `/makeinfo/get`);
  }
  addoreditBrand(data)
  {
    return this.http.post(url + `/makeinfo/post` , data);
  }
  getBrandById(id)
  {
    return this.http.get(url + `/makeinfo/get?no=${id}`);
  }

  getCategories()
  {
    return this.http.get(url + `/productinfo/get`);
  }
  addoreditCategory(data)
  {
    return this.http.post(url + `/productinfo/post` , data);
  }
  getCategoryById(id)
  {
    return this.http.get(url + `/productinfo/get?no=${id}`);
  }
  //items
  getItems()
  {
    return this.http.get(url + `/iteminfo/get`);
  }
  addoreditItem(data)
  {
    return this.http.post(url + `/iteminfo/post` , data);
  }
  getItemById(id)
  {
    return this.http.get(url + `/iteminfo/get?no=${id}`);
  }

  getUnits()
  {
    return this.http.get(url + `/unitinfo/get`);
  }
  addoreditUnit(data)
  {
    return this.http.post(url + `/unitinfo/post` , data);
  }
  getUnitById(id)
  {
    return this.http.get(url + `/unitinfo/get?no=${id}`);
  }
  getOrders()
  {
    return this.http.get(url + `/sldsaleorderhdr/get?authenticationtoken=${this.authtoken}`);
  }
  getCompany()
  {
    return this.http.get(url + `/companyinfo/get`);
  }
  UpdateCompany(data)
  {
    return this.http.post(url + `/companyinfo/post`,data);
  }
  getOrderById(id)
  {
    return this.http.get(url + `/sldsaleorderhdr/get?no=${id}&authenticationtoken=${this.authtoken}`);
  }
  updateOrder(data)
  {
    return this.http.post(url + '/sldsaleorderhdr/post',data);
  }
  createcustomer(data)
  {
    return this.http.post(url + `/custinfo/post`,data);
  }
  getallcustomer(data)
  {
    return this.http.get(url + `/custinfo/get?authenticationtoken=${this.authtoken}`);
  }
  getcustomerById(id)
  {
    return this.http.get(url + `/custinfo/get?no=${id}&authenticationtoken=${this.authtoken}`);
  }
  createorder(data)
  {
    return this.http.post(url + "sldsaleorderhdr/post" , data);
  }
  
}