import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../../components/loader/Loader';
import { AuthContext } from '../../context/authContext';
import { useHttp } from '../../hooks/httpHook';
import { useMessage } from '../../hooks/messageHook';
import { IAddProductProps } from '../../interface';

export const AddNewProduct: React.FC = () => {
    const [product, setProduct] = useState<IAddProductProps>({ 
        type: 'solar', producer: '', series: '', power: '', free: '', actualy: '', comments: '' 
    });
    const message = useMessage();
    const {tokenAdmin} = useContext(AuthContext);
    const {request, loading} = useHttp();

    const addProductChangeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setProduct({...product, [event.target.name]: event.target.value});
    }

    const addProductSubmitHandler = async () => {
        try {
            const data = await request('/api/add-product', 'POST', {...product}, {
                Authorization: `Bearer ${tokenAdmin}`
            });
            message(data.message);
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    useEffect(() => {
        window.M.AutoInit()
    }, []);

    return (
        <div className="row">
            <h3>Добавити продукт</h3>
            <div className='row'>
                <div className="input-field col s1">
                    <select
                        name='type'
                        id="type"
                        className="validate sky-input"
                        value={product.type}
                        onChange={addProductChangeHandler}
                        >
                        <option value="solar">Модуль</option>
                        <option value="other">Продукт</option>
                    </select>
                    <label htmlFor="type">Тип товару</label>
                </div>
                <div className="input-field col s2">
                    <input 
                        name="producer"
                        id="producer" 
                        type="text" 
                        className="validate"
                        value={product.producer}
                        onChange={addProductChangeHandler}
                    />
                    <label htmlFor="producer">Виробник</label>
                </div>
                <div className="input-field col s1">
                    <input 
                        name="series"
                        id="series" 
                        type="number" 
                        className="validate"
                        value={product.series}
                        onChange={addProductChangeHandler}
                    />
                    <label htmlFor="series">Серія</label>
                </div>
                <div className="input-field col s1">
                    <input 
                        name="power"
                        id="power" 
                        type="number" 
                        className="validate"
                        value={product.power}
                        onChange={addProductChangeHandler}
                    />
                    <label htmlFor="power">Потужність</label>
                </div>
                <div className="input-field col s1">
                    <input 
                        name="free"
                        id="free" 
                        type="number" 
                        className="validate"
                        value={product.free}
                        onChange={addProductChangeHandler}
                    />
                    <label htmlFor="free">Вільних</label>
                </div>
                <div className="input-field col s1">
                    <input 
                        name="actualy"
                        id="actualy" 
                        type="number" 
                        className="validate"
                        value={product.actualy}
                        onChange={addProductChangeHandler}
                    />
                    <label htmlFor="actualy">Загалом</label>
                </div>
                <div className="input-field col s2">
                    <input 
                        name="comments"
                        id="comments" 
                        type="text" 
                        className="validate"
                        value={product.comments}
                        onChange={addProductChangeHandler}
                    />
                    <label htmlFor="comments">Коментар</label>
                </div>
                <div className="card-action center col s12">
					<button 
						className="btn green black-text darken-3"
						onClick={addProductSubmitHandler}
						disabled={loading}
						>Добавити
					</button>
				</div>
            </div>
        </div>
    )
}