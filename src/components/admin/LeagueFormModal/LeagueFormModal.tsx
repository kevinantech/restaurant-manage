"use client";
import { CreateLeagueDto } from "@/backend/modules/league/infrastructure/dtos/create-league.dto";
import { usePlaceholder, useSaveLeague } from "@/hooks";
import { AdminThemeProvider } from "@/providers";
import { Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader, PrimaryButton, SuccessfulSnackbarAlert } from "..";

export interface LeagueFormModalProps {
  open: boolean;
  onClose: () => void;
}

const LeagueFormModal: React.FC<LeagueFormModalProps> = ({ onClose, open }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateLeagueDto>({
    defaultValues: {
      name: "",
    },
  });
  const {
    clearError: clearRejectionError,
    data,
    error: rejectionError,
    handleSaveLeague,
    loading,
  } = useSaveLeague();

  const nameField = register("name", {
    required: "Este campo es obligatorio.",
  });

  const [openSuccessMessage, setOpenSuccessMessage] = useState<boolean>(false);

  /* Retroalimentación despues de crear un recurso */
  useEffect(() => {
    if (data) {
      reset();
      onClose();
      setOpenSuccessMessage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const placeholder = usePlaceholder("Título");
  return (
    <>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClose={onClose}
      >
        <div className="w-full mx-5 p-6 rounded-2xl bg-white semi-sm:mx-20 lg:max-w-3xl">
          <p className="mb-6 text-lg text-neutral-800 font-semibold">Añadir Liga</p>
          <AdminThemeProvider>
            <TextField
              className="mb-4"
              fullWidth
              label="Título"
              placeholder={placeholder}
              error={!!errors.name || !!rejectionError}
              helperText={errors.name?.message ?? rejectionError?.message}
              name={nameField.name}
              ref={nameField.ref}
              onBlur={nameField.onBlur}
              onChange={(event) => {
                clearRejectionError();
                nameField.onChange(event);
              }}
            />
          </AdminThemeProvider>
          <PrimaryButton
            className="h-9"
            label="Agregar"
            onClick={handleSubmit(handleSaveLeague)}
          />
          <Loader open={loading} />
        </div>
      </Modal>
      {!!data && (
        <SuccessfulSnackbarAlert
          open={openSuccessMessage}
          message={typeof data.message === "string" ? data.message : data.message[0]}
          onClose={() => setOpenSuccessMessage(false)}
        />
      )}
    </>
  );
};

export default LeagueFormModal;
