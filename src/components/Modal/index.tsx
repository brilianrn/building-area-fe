import { Dialog, Transition } from '@headlessui/react';
import React, { ReactNode } from 'react';
import Button from '../Button';
import Card from '../Card';

interface ModalNoticeProps {
  title: string;
  showModal: boolean;
  onCloseModal: () => void;
  onCloseModalBackground?: () => void;
  cancelButtonRef?: React.MutableRefObject<null>;
  children?: ReactNode;
  confirmButton?: string;
}

const Modal = ({
  title,
  showModal,
  onCloseModal,
  children,
  confirmButton,
}: ModalNoticeProps) => {
  return (
    <React.Fragment>
      <Transition appear show={showModal} as="div">
        <Dialog as="div" className="bg-danger-default" onClose={onCloseModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Card>
                  <Card.Header onClose={onCloseModal}>
                    <p className="font-bold md:text-[25px] text-[15px] w-full">
                      {title}
                    </p>
                  </Card.Header>
                  {children}
                  <div className={confirmButton ? 'visible' : 'hidden'}>
                    <Card.Footer>
                      <Button
                        label={confirmButton || 'OKE'}
                        onClick={onCloseModal}
                        type="primary"
                      />
                    </Card.Footer>
                  </div>
                </Card>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
};

export default Modal;
