import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Caffeine() {

    const [drink, setDrink] = useState('');

    const [error, setError] = useState(null);

    const [drinks, setDrinks] = useState(null);

    const [drinksHaveToday, setDrinksHaveToday] = useState([]);

    const [totalCaffeine, setTotalCaffeine] = useState(0);

    useEffect(() => {
        fetchDrink()
        fetchDrinkHaveToday();
    }, []);

    useEffect(() => {
        calculateCafefine();
    }, [drinksHaveToday])

    function fetchDrink() {
        return fetch('/api/drinks')
            .then(response =>
                response.json()
            )
            .then(result => {
                setDrinks(result.data);
                setError(null);
            })
            .catch(error => {
                setError(['Can not Fetch Drink list or you reach the limit']);
            });
    }

    const handleDrinkInput = (event) => {
        setDrink(event.target.value);
    };

    const fetchDrinkHaveToday = () => {
        setError(null);
        axios.get('/user-drink')
            .then(response => {
                setDrinksHaveToday(response.data.data);
                setDrink('');
                calculateCafefine(response.data.data)
            })
            .catch(error => {
                Object.keys(errors.response.data.errors).map((key) => {
                    result.push(errors.response.data.errors[key][0])

                });

                setError(result);
            });
    }

    const submitDrink = () => {
        setError(null);
        axios.post('/user-drink', { 'drink': drink })
            .then(response => {
                setDrinksHaveToday(response.data.data);
                calculateCafefine(null);
            })
            .catch(errors => {
                let result= [];
                Object.keys(errors.response.data.errors).map((key) => {
                    result.push(errors.response.data.errors[key][0])

                });

                setError(result);
            });
    }

    const clearDrinks = () => {
        setError(null);
        axios.delete('/user-drink', )
            .then(response => {
                setDrinksHaveToday([]);
                calculateCafefine(null);
            })
            .catch(error => {
                let result = [];
                Object.keys(errors.response.data.errors).map((key) => {
                    result.push(errors.response.data.errors[key][0])
                });
                setError(result);
            });
    };

    const calculateCafefine = (drinks=null) => {
        const total = drinks ? drinks.reduce((carry, current) => { return carry += current.caffeine }, 0)
            : drinksHaveToday.reduce((carry, current) => { return carry += current.caffeine }, 0);
        setTotalCaffeine(total);
    }

    return (
        <>
            <div className="container">
                {
                    error && (
                        <div className="px-6 py-4 bg-red-100 rounded-xl text-red-500 mb-5">
                            {error}
                        </div>
                    )
                }
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Drinks
                </label>
                <select
                    id="location"
                    name="location"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    defaultValue="Canada"
                    onChange={handleDrinkInput}
                >
                    <option value='' >Select A Drink</option>
                    {
                        drinks && drinks.map((drink,idx) => {
                            return (
                                <option value={drink.id} key={idx}>{drink.name} { drink.caffeine }mg</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="mt-2 flex justify-end space-x-2">
                <button type="button" className="inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                        onClick={clearDrinks}
                    >
                        Clear Drink
                </button>
                <button type="button" className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                    onClick={ submitDrink }
                >
                    Add Drink
                </button>

            </div>
            <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Today Summary</h3>
                        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Drinks</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{drinksHaveToday ? drinksHaveToday.length :'0'}</dd>
                            </div>

                            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Caffeine</dt>
                                <dd className={`mt-1 text-3xl font-semibold  ${totalCaffeine > 500 ? 'text-red-500' : 'text-gray-900'}`} >{totalCaffeine}</dd>
                            </div>

                            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Caffeine Remain </dt>
                                <dd className={`mt-1 text-3xl font-semibold  ${totalCaffeine > 500 ? 'text-red-500' : 'text-gray-900'}`} >
                                    {totalCaffeine <= 500 ? (500 - totalCaffeine):('Over The Limit')  }
                                </dd>
                            </div>

                        </dl>
                    </div>

            </div>

            <div className="mt-4">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"

                                            >
                                                Drink Name
                                            </th>
                                            <th
                                                scope="col"
                                                    className="px-6 py-3  md:w-1/2 ext-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                            >
                                                Description
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                            >
                                                Caffeine
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Drinked At
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            drinksHaveToday && drinksHaveToday.map((drink, drinkIdx) => (
                                            <tr key={drink.name+Math.random().toString()} className={drinkIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{drink.name}</td>
                                                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{drink.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{drink.caffeine}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{drink.drinked_at}</td>
                                            </tr>
                                            ))
                                        }
                                        {
                                            !drinksHaveToday && (
                                                <tr className="bg-white">
                                                    <td colSpan="4">No Drinks Today</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        </>
    );
}

export default Caffeine;

if (document.getElementById('root')) {
    ReactDOM.render(<Caffeine />, document.getElementById('root'));
}