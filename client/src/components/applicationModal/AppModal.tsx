import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useMessage } from "../../hooks/messageHook";
import { useHttp } from "../../hooks/httpHook";
import {TModalForm} from "./types";
import './appModal.css';

const validateForm = (err: Object) => {
  let valid = true;
  Object.values(err).forEach((val: string) => val.length > 0 && (valid = false));
  return valid;
};

export const AppModal: React.FC = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {request, error, clearError} = useHttp();
  const [form, setForm] = useState<TModalForm>({
    deliverPlaning: '',
    goods: '',
    sendMethod: '',
    city: '',
    recipientData: '',
    payer: 'Отримувач',
    commentsSales: '',
    errors: {
      deliverPlaning: '',
      goods: '',
      sendMethod: '',
      city: '',
      recipientData: '',
      payer: '',
      commentsSales: '',
    }
  });
  
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  useEffect(()=>{
    message(error);
    clearError();
  }, [error, message, clearError]);



  const changeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    const errors = form.errors;

    switch (name) {
      case "deliverPlaning":
        errors.deliverPlaning =
          value.length < 5
            ? "Deliver planing must be at least 5 characters long!"
            : "";
        break;
      case "goods":
        errors.goods =
          value.length < 8
            ? "Goods must be at least 8 characters long!"
            : "";
        break;
      case "sendMethod":
        errors.sendMethod =
          value.length < 4
            ? "Send method must be at least 4 characters long!"
            : "";
        break;
      case "city":
        errors.city =
          value.length < 3
            ? "City must be at least 3 characters long!"
            : "";
        break;
      case "recipientData":
        errors.recipientData =
          value.length < 5
            ? "Recipient Data must be at least 5 characters long!"
            : "";
        break;
      default:
        break;
    }
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const pressHandler = async () => {
      try {
        if (validateForm(form.errors) && (form.deliverPlaning.length > 0 && form.goods.length > 0 && 
          form.sendMethod.length > 0 && form.city.length > 0 && form.recipientData.length > 0 )) {
          const data = await request('/api/add_application', 'POST', {...form}, {
            Authorization: `Bearer ${auth.token}`
          });
          message(data.data.message);
          setTimeout(()=>window.location.reload(), 2000);
        } else {
          message('Заявку не добавлено');
        }
      } catch (e) {}
  }

  const [modal, setModal] = useState<boolean>(false);
  const handleShow = () => setModal(true);

  return (
    <div>
      <button  data-target="modal1" onClick={handleShow} className="btn modal-trigger">Нова заявка</button>
      <div id="modal1" className="modal" style={{background: "green"}}>
        <div className="modal-content" style={{ color: "black", background: "#eeeeee"}}>
          <h4 style={{textAlign: 'center', fontWeight: 500}}>Введідь дані нової заявки</h4>
          {modal}
          <form className="col s12" noValidate>
            <div className="row">
              <div className="input-field col s6">
                <input 
                  name='deliverPlaning' 
                  id="deliverPlaning" 
                  type="text"
                  className="validate sky-input autocomplete"
                  value={form.deliverPlaning}
                  onChange={changeHandler}
                  />
                  {form.errors.deliverPlaning.length > 0 && (
                    <span className="error">{form.errors.deliverPlaning}</span>
                  )}
                  <label htmlFor="deliverPlaning">Планова дата доставки</label>
                </div>
                <div className="input-field col s6">
                  <input
                    name='goods'
                    id="goods" 
                    type="text" 
                    className="validate sky-input"
                    value={form.goods}
                    onChange={changeHandler}
                  />
                  <label htmlFor="goods">Вантаж</label>
                  {form.errors.goods.length > 0 && (
                    <span className="error">{form.errors.goods}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    name='sendMethod'
                    id="sendMethod" 
                    type="text" 
                    className="validate sky-input"
                    value={form.sendMethod}
                    onChange={changeHandler}
                  />
                  <label htmlFor="sendMethod">Метод відправки</label>
                  {form.errors.sendMethod.length > 0 && (
                    <span className="error">{form.errors.sendMethod}</span>
                  )}
                </div>
                <div className="input-field col s6">
                  <input
                    name='city'
                    id="city"
                    type="text"
                    className="validate sky-input"
                    value={form.city}
                    onChange={changeHandler}
                  />
                  <label htmlFor="city">Місто</label>
                  {form.errors.city.length > 0 && (
                    <span className="error">{form.errors.city}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    name='recipientData'
                    id="recipientData" 
                    type="text" 
                    className="validate sky-input"
                    value={form.recipientData}
                    onChange={changeHandler}
                  />
                <label htmlFor="recipientData">Дані отримувача</label>
                {form.errors.recipientData.length > 0 && (
                  <span className="error">{form.errors.recipientData}</span>
                )}
              </div>
              <div className="input-field col s6">
                <select
                  name='payer'
                  id="payer"
                  className="validate sky-input"
                  value={form.payer}
                  onChange={changeHandler}>
                    <option value="Отримувач">Отримувач</option>
                    <option value="Відправник">Відправник</option>
                </select>
                <label htmlFor="commentsSales">Платник</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name='commentsSales'
                  id="commentsSales"
                  type="email"
                  className="validate sky-input"
                  value={form.commentsSales}
                  onChange={changeHandler}
                />
                <label htmlFor="commentsSales">Коментар менеджера</label>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer" style={{background: "#8d6e63"}}>
          <button
            className="red waves-effect waves-green btn-flat">
              reset</button>
          <button
            className="btn green black-text darken-5 waves-effect waves-green btn-flat"
            onClick={pressHandler}>
              Submit
          </button>
        </div>
      </div>
    </div>
  )
}