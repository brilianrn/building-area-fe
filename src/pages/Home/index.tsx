import React, { useEffect, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { SelectOption } from '../../components/Input';
import { SelectOptionValue } from '../../components/Input/index.type';
import Layout from '../../components/Layout';
import { useAreas } from '../../hooks/useAreas';
import { useBuildings } from '../../hooks/useBuildings';
import { useFurnitures } from '../../hooks/useFurnitures';
import {
  setAreasList,
  setIsChangeArea,
} from '../../store/actions/areas.action';
import {
  setFurnitureList,
  setIsChangeFurniture,
} from '../../store/actions/furnitures.action';
import { IRootState } from '../../store/reducers';
import FormArea from './FormArea';
import FormBuilding from './FormBuilding';
import FormFurniture from './FormFurniture';
import { AreaType, BuildingType, FurnituresType } from './Home.type';

const Home = () => {
  /* Redux */
  const dispatch = useDispatch();
  const { furnitures, isChangeFurniture, furniture } = useSelector(
    (state: IRootState) => state.furnitures
  );
  const { buildings } = useSelector((state: IRootState) => state.buildings);
  const { areas, isChangeArea, area } = useSelector(
    (state: IRootState) => state.areas
  );

  /* Hooks */
  const {
    getFurnitureList,
    furnitureLoading,
    createFurniture,
    getDetailFurniture,
    removeFurniture,
    resetVariablesFurniture,
    updateFurnitures,
  } = useFurnitures();
  const { getBuildingList, buildingLoading, createBuilding } = useBuildings();
  const {
    getAreaList,
    areaLoading,
    updateAreas,
    createArea,
    getDetailArea,
    removeArea,
  } = useAreas();

  /* Local State */
  //building
  const [searchBuilding, setSearchBuilding] = useState<SelectOptionValue>();
  const [showModalBuilding, setShowModalBuilding] = useState<boolean>(false);
  // area
  const [selectedAreaId, setSelectedAreaId] = useState<string>();
  const [showModalArea, setShowModalArea] = useState<boolean>(false);
  const [isUpdateArea, setIsUpdateArea] = useState<boolean>(false);
  const [isSeeDetailArea, setIsSeeDetailArea] = useState<boolean>(false);
  const [isDeleteArea, setIsDeleteArea] = useState<boolean>(false);
  // furniture
  const [showModalFurniture, setShowModalFurniture] = useState<boolean>(false);
  const [selectedFurnitureId, setSelectedFurnitureId] = useState<string>();
  const [isUpdateFurniture, setIsUpdateFurniture] = useState<boolean>(false);
  const [isDeleteFurniture, setIsDeleteFurniture] = useState<boolean>(false);
  const [isSeeDetailFurniture, setIsSeeDetailFurniture] =
    useState<boolean>(false);

  useEffect(() => {
    getBuildingList();
  }, []);

  useEffect(() => {
    if (buildings)
      setSearchBuilding(
        buildings.map((e: BuildingType) => {
          return {
            ...e,
            value: e?.id,
            label: e?.name,
          };
        })[0]
      );
  }, [buildings]);

  useEffect(() => {
    if (searchBuilding) {
      getAreaList({ buildingId: searchBuilding?.value?.toString() });
      getFurnitureList(searchBuilding?.value?.toString());
    }
  }, [searchBuilding]);

  const onSubmitBuilding = async (payload: BuildingType) => {
    setShowModalBuilding(false);
    await createBuilding(payload);
  };

  const onSubmitArea = async (payload: AreaType) => {
    if (selectedAreaId && isUpdateArea) {
      await updateAreas(searchBuilding?.value?.toString() || '', [payload]);
      setIsUpdateArea(false);
      setShowModalArea(false);
    } else {
      setShowModalArea(false);
      await createArea({
        data: payload,
        buildingId: searchBuilding?.value?.toString() || '',
      });
    }
  };

  const onShowDetailArea = async (id: string) => {
    await getDetailArea(id);
    setSelectedAreaId(id);
    setIsSeeDetailArea(false);
    setIsUpdateArea(true);
    setShowModalArea(true);
  };

  const onDragArea = ({ data, id }: { data: DraggableData; id: string }) => {
    const { x, y } = data;
    if (areas && id && x >= -0.3125 && y >= -125.078125) {
      const tempData = areas.map((e: AreaType) => {
        if (id === e.id) {
          return {
            ...e,
            positionX: Math.floor(x),
            positionY: Math.floor(y),
            isUpdate: true,
          };
        }
        return e;
      });
      dispatch(setIsChangeArea(true));
      dispatch(setAreasList(tempData));
    } else {
      dispatch(setAreasList(areas));
    }
  };

  const onDeleteArea = async () => {
    setIsDeleteArea(false);
    await removeArea(
      selectedAreaId || '',
      searchBuilding?.value?.toString() || ''
    );
    setSelectedAreaId(undefined);
  };

  /* Furniture */
  const onSubmitFurniture = async (payload: FurnituresType) => {
    if (selectedFurnitureId && isUpdateFurniture) {
      await updateFurnitures(searchBuilding?.value?.toString() || '', [
        payload,
      ]);
      setIsUpdateFurniture(false);
      setShowModalFurniture(false);
    } else {
      setShowModalFurniture(false);
      await createFurniture({
        data: {
          ...payload,
          buildingId: searchBuilding?.value?.toString() || '',
        },
        buildingId: searchBuilding?.value?.toString() || '',
      });
    }
  };

  const onShowDetailFurniture = async (id: string) => {
    await getDetailFurniture(id);
    setSelectedFurnitureId(id);
    setIsSeeDetailFurniture(false);
    setIsUpdateFurniture(true);
    setShowModalFurniture(true);
  };

  const onDragFurniture = ({
    data,
    id,
  }: {
    data: DraggableData;
    id: string;
  }) => {
    const { x, y } = data;
    if (furnitures && id && x >= -0.3125 && y >= -125.078125) {
      const tempData = furnitures.map((e: FurnituresType) => {
        if (id === e.id) {
          return {
            ...e,
            positionX: Math.floor(x),
            positionY: Math.floor(y),
            isUpdate: true,
          };
        }
        return e;
      });
      dispatch(setIsChangeFurniture(true));
      dispatch(setFurnitureList(tempData));
    } else {
      dispatch(setFurnitureList(furnitures));
    }
  };

  const onDeleteFurniture = async () => {
    setIsDeleteFurniture(false);
    await removeFurniture(
      selectedFurnitureId || '',
      searchBuilding?.value?.toString() || ''
    );
    setSelectedFurnitureId(undefined);
  };

  const onSubmit = () => {
    if (isChangeArea) {
      dispatch(setIsChangeArea(false));
      updateAreas(searchBuilding?.value?.toString() || '');
    }
    if (isChangeFurniture) {
      dispatch(setIsChangeFurniture(false));
      updateFurnitures(searchBuilding?.value?.toString() || '');
    }
  };

  return (
    <React.Fragment>
      <Layout>
        <FormBuilding
          setShowModal={setShowModalBuilding}
          showModal={showModalBuilding}
          onSubmit={onSubmitBuilding}
        />
        <FormArea
          showModal={showModalArea}
          setShowModal={setShowModalArea}
          onSubmit={onSubmitArea}
          buildingId={searchBuilding?.value?.toString() || ''}
          data={area}
          isUpdateData={isUpdateArea}
          isDelete={isDeleteArea}
          setIsDelete={setIsDeleteArea}
          isSeeDetail={isSeeDetailArea}
          onDelete={onDeleteArea}
        />
        <FormFurniture
          showModal={showModalFurniture}
          setShowModal={setShowModalFurniture}
          onSubmit={onSubmitFurniture}
          data={furniture}
          isSeeDetail={isSeeDetailFurniture}
          isUpdateData={isUpdateFurniture}
          isDelete={isDeleteFurniture}
          onDelete={onDeleteFurniture}
          setIsDelete={setIsDeleteFurniture}
        />
        <div className="bg-gray-50 h-screen">
          <p className="absolute text-center w-full mt-3 font-bold text-xl text-gray-600">
            {searchBuilding?.label}
          </p>
          <div className="absolute top-[55px] left-[62px] w-[91.2%]">
            <div className="flex justify-between space-x-2">
              <div className="flex justify-start space-x-2">
                <SelectOption
                  placeholder="Pilih gedung"
                  isMulti={false}
                  setValue={setSearchBuilding}
                  value={searchBuilding}
                  disbaled={isChangeArea || isChangeFurniture}
                  className="bg-white z-[-10] w-[200px]"
                  options={
                    buildings &&
                    buildings.map((e: BuildingType) => {
                      return {
                        value: e.id,
                        label: e.name,
                      };
                    })
                  }
                />
                <div>
                  <Button
                    label="Tambah Gedung"
                    type="primary-blue"
                    disabled={isChangeArea || isChangeFurniture}
                    onClick={() => setShowModalBuilding(true)}
                  />
                </div>
                <div>
                  <Button
                    label="Tambah Area"
                    type="primary-blue"
                    disabled={isChangeArea || isChangeFurniture}
                    onClick={() => setShowModalArea(true)}
                  />
                </div>
                <div>
                  <Button
                    label="Tambah Furnitur"
                    type="primary-blue"
                    onClick={() => setShowModalFurniture(true)}
                    disabled={
                      !areas ||
                      !areas?.length ||
                      isChangeArea ||
                      isChangeFurniture
                    }
                  />
                </div>
              </div>
              <div>
                <Button
                  label="Simpan"
                  type="success"
                  disabled={!isChangeArea && !isChangeFurniture}
                  onClick={onSubmit}
                />
              </div>
            </div>
          </div>
          {furnitureLoading || buildingLoading || areaLoading ? (
            <div className="flex flex-col items-center justify-center mx-auto md:h-screen">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/Spinner.gif`}
                alt="icon-loading"
                className="w-[50px]"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mx-auto md:h-screen">
              <div className="bg-white border-[#CECECE] border-[8px] h-[550px] w-[1300px]">
                <div className="absolute h-[120px] w-[120px] bg-white bottom-[107px] left-[62px] border-0" />
                {areas &&
                  areas.map((area: AreaType) => {
                    return (
                      <Draggable
                        key={area.id}
                        defaultPosition={{
                          x: area.positionX,
                          y: area.positionY,
                        }}
                        onDrag={(_e: DraggableEvent, data: DraggableData) =>
                          onDragArea({ data, id: area.id || '' })
                        }
                      >
                        <div className="w-fit">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/IconCross.svg`}
                            alt="icon"
                            className="absolute top-[-10px] right-[-10px] w-[15px] hover:cursor-pointer"
                            onClick={() => {
                              setIsDeleteArea(true);
                              setSelectedAreaId(area.id);
                            }}
                          />
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/IconArea.svg`}
                            alt="icon"
                          />
                          <p
                            className="text-[#A03D4C] text-center text-sm font-bold hover:cursor-pointer hover:text-red-500"
                            onClick={() => onShowDetailArea(area.id || '')}
                          >
                            {area.name}
                          </p>
                        </div>
                      </Draggable>
                    );
                  })}
                {furnitures &&
                  furnitures.map((furniture: FurnituresType) => {
                    return (
                      <Draggable
                        key={furniture.id}
                        defaultPosition={{
                          x: furniture.positionX,
                          y: furniture.positionY,
                        }}
                        onDrag={(_e: DraggableEvent, data: DraggableData) =>
                          onDragFurniture({ data, id: furniture.id || '' })
                        }
                      >
                        <div className="w-fit">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/IconCross.svg`}
                            alt="icon"
                            className="absolute top-[-12px] right-[-10px] w-[15px] hover:cursor-pointer"
                            onClick={() => {
                              setIsDeleteFurniture(true);
                              setSelectedFurnitureId(furniture.id);
                            }}
                          />
                          <img
                            src={`${process.env.PUBLIC_URL}${furniture.path}`}
                            alt="icon"
                            className="text-center"
                          />
                          <p
                            className="text-[#5B5B5B] text-center text-sm font-bold hover:cursor-pointer hover:text-[#777777]"
                            onClick={() =>
                              onShowDetailFurniture(furniture.id || '')
                            }
                          >
                            {furniture.name}
                          </p>
                        </div>
                      </Draggable>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Home;
