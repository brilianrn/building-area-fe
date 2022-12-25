import React, { FC, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { InputText } from '../../../components/Input';
import Modal from '../../../components/Modal';
import { AreaType, FormAreaProps } from '../Home.type';

const FormArea: FC<FormAreaProps> = ({
  setShowModal,
  showModal,
  onSubmit,
  buildingId,
  data,
  isUpdateData,
  isSeeDetail,
  isDelete,
  onDelete,
  setIsDelete,
}) => {
  /* Local State */
  const [errorField, setErrorField] = useState<boolean>(false);
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (data && isUpdateData) {
      setName(data.name);
    }
  }, [data, isUpdateData]);

  const onSubmitForm = () => {
    if (!name) return setErrorField(true);
    const payload: AreaType = {
      name,
      positionX: data?.positionX || 500,
      positionY: data?.positionY || 200,
      buildingId: buildingId || '',
      isUpdate: true,
    };
    if (onSubmit) {
      onSubmit(isUpdateData && data ? { ...data, ...payload } : payload);
      return resetForm();
    }
  };

  const resetForm = () => {
    setName(undefined);
    setErrorField(false);
  };
  return (
    <React.Fragment>
      {setIsDelete && onDelete && (
        <Modal
          onCloseModal={() => setIsDelete(false)}
          showModal={isDelete || false}
          title="Hapus Area"
        >
          <p className="text-lg font-normal">
            Apakah Anda yakin ingin mengapus area ini?
          </p>
          <div className="text-center flex justify-between space-x-2 mt-5">
            <Button label="Ya" type="primary" onClick={onDelete} />
            <Button
              label="Batal"
              type="danger"
              onClick={() => {
                setIsDelete(false);
              }}
            />
          </div>
        </Modal>
      )}
      <Modal
        onCloseModal={() => setShowModal(false)}
        showModal={showModal}
        title={`${
          isUpdateData ? 'Ubah' : isSeeDetail ? 'Detail' : 'Tambah'
        } Area`}
      >
        <div className="w-[500px] text-left">
          <InputText
            placeholder="Masukkan nama area"
            setValue={setName}
            value={name}
            type="text"
            label="Nama Area"
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

export default FormArea;
