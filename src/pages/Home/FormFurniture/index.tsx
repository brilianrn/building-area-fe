import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { InputText, SelectOption } from '../../../components/Input';
import { SelectOptionValue } from '../../../components/Input/index.type';
import Modal from '../../../components/Modal';
import { IRootState } from '../../../store/reducers';
import { FurnituresType, FormPropsFurniture, AreaType } from '../Home.type';

const FurniturList: SelectOptionValue[] = [
  {
    label: 'Eskalator',
    value: '/assets/images/IconEscalator.svg',
  },
  {
    label: 'Gate',
    value: '/assets/images/IconGates.svg',
  },
  {
    label: 'Lemari Besar',
    value: '/assets/images/IconLargeCupboard.svg',
  },
  {
    label: 'Dinding Pembatas Medium',
    value: '/assets/images/IconMediumWall.svg',
  },
  {
    label: 'Dinding Pembatas Kecil',
    value: '/assets/images/IconSmallWall.svg',
  },
];

const FormFurniture: FC<FormPropsFurniture> = ({
  setShowModal,
  showModal,
  onSubmit,
  data,
  isUpdateData,
  isDelete,
  onDelete,
  setIsDelete,
}) => {
  const { areas } = useSelector((state: IRootState) => state.areas);

  /* Local State */
  const [errorField, setErrorField] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [area, setArea] = useState<SelectOptionValue>();
  const [furniture, setFurniture] = useState<SelectOptionValue>();

  useEffect(() => {
    if (isUpdateData && data && areas) {
      console.log(
        areas.filter((e: AreaType) => e.id === data.areaId),
        ' areas.filter((e: AreaType) => e.id === data.areaId)'
      );
      setName(data.name);
      setArea(
        areas
          .filter((e: AreaType) => e.id === data.areaId)
          .map((e: AreaType) => {
            return {
              value: e?.id,
              label: e?.name,
            };
          })[0]
      );
      setFurniture(
        FurniturList.filter((e: SelectOptionValue) => e.value === data.path)[0]
      );
    }
  }, [isUpdateData, data, areas]);

  const onSubmitForm = () => {
    if (!name) return setErrorField(true);
    const payload: FurnituresType = {
      name,
      areaId: area ? area.value.toString() : '',
      path: furniture?.value.toString() || '',
      positionX: data?.positionX || 500,
      positionY: data?.positionY || 100,
    };
    if (onSubmit) {
      onSubmit(data ? { ...data, ...payload } : payload);
      return resetForm();
    }
  };

  const resetForm = () => {
    setName(undefined);
    setArea(undefined);
    setFurniture(undefined);
    setErrorField(false);
  };
  return (
    <React.Fragment>
      {setIsDelete && onDelete && (
        <Modal
          onCloseModal={() => setIsDelete(false)}
          showModal={isDelete || false}
          title="Hapus Furnitur"
        >
          <p className="text-lg font-normal">
            Apakah Anda yakin ingin mengapus furnitur ini?
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
        title="Tambah Furnitur"
      >
        <div className="w-[500px] text-left">
          <SelectOption
            placeholder="Pilih area"
            isMulti={false}
            setValue={setArea}
            value={area}
            required
            useLabel
            labelClassName="font-[500] text-[14px] mb-2 text-gray-600"
            label="Area"
            options={
              areas &&
              areas.map((e: AreaType) => {
                return {
                  value: e?.id,
                  label: e?.name,
                };
              })
            }
          />
          <SelectOption
            placeholder="Pilih furnitur"
            isMulti={false}
            setValue={setFurniture}
            value={furniture}
            required
            useLabel
            labelClassName="font-[500] text-[14px] mb-2 text-gray-600 mt-3"
            label="Furnitur"
            options={FurniturList}
          />
          <InputText
            placeholder="Masukkan nama furnitur"
            setValue={setName}
            value={name}
            type="text"
            label="Nama Furnitur"
            readOnly={!area}
            useLabel
            required
            labelClassName="font-[500] text-[14px] mb-2 text-gray-600 mt-3"
            isShowWarning={errorField && !name}
            genre={errorField && !name ? 'danger' : 'secondary'}
          />
        </div>
        <div className="text-center flex justify-between space-x-2 mt-9">
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

export default FormFurniture;
