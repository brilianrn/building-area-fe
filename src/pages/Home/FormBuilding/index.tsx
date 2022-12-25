import React, { FC, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { InputText } from '../../../components/Input';
import Modal from '../../../components/Modal';
import { BuildingType, FormBuildingProps } from '../Home.type';

const FormBuilding: FC<FormBuildingProps> = ({
  setShowModal,
  showModal,
  onSubmit,
}) => {
  /* Local State */
  const [errorField, setErrorField] = useState<boolean>(false);
  const [name, setName] = useState<string>();

  const onSubmitForm = () => {
    if (!name) return setErrorField(true);
    const payload: BuildingType = { name };
    if (onSubmit) {
      onSubmit(payload);
      return resetForm();
    }
  };

  const resetForm = () => {
    setName(undefined);
    setErrorField(false);
  };
  return (
    <React.Fragment>
      <Modal
        onCloseModal={() => setShowModal(false)}
        showModal={showModal}
        title="Tambah Gedung"
      >
        <div className="w-[500px] text-left">
          <InputText
            placeholder="Masukkan nama gedung"
            setValue={setName}
            value={name}
            type="text"
            label="Nama Gedung"
            useLabel
            required
            labelClassName="font-[500] text-[14px] mb-2 text-gray-600"
            isShowWarning={errorField && !name}
            genre={errorField && !name ? 'danger' : 'secondary'}
          />
        </div>
        <div className="text-center flex justify-between space-x-2 mt-5">
          <Button
            label="Simpan"
            type="primary"
            disabled={!name}
            onClick={onSubmitForm}
          />
          <Button
            label="Batal"
            type="danger"
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default FormBuilding;
