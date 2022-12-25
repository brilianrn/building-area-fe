import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { InputText } from '../../components/Input';
import {
  removeLocalStorageItem,
  retrieveLocalStorageItem,
  storeLocalStorageItem,
} from '../../utils/localStorage';

const Login = () => {
  /* User Info */
  const existName = retrieveLocalStorageItem('name');

  /* Router DOM */
  const navigate = useNavigate();

  /* Local State */
  const [name, setName] = useState<string>();

  const onSubmit = () => {
    removeLocalStorageItem('name');
    storeLocalStorageItem({ storageKey: 'name', storageValue: name || '' });
    navigate('/');
  };

  useEffect(() => {
    if (existName) removeLocalStorageItem('name');
  }, [removeLocalStorageItem]);
  return (
    <React.Fragment>
      <section className="bg-gray-50 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Silahkan masukkan nama Anda
              </h1>
              <InputText
                placeholder="Masukkan nama"
                setValue={setName}
                type="text"
                value={name}
              />
              <Button
                label="Masuk"
                type="primary-blue"
                disabled={!name}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
