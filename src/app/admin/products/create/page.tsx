"use client";
import { EJerseyEdition } from "@/backend/modules/jersey/domain/jersey-enum";
import { Color } from "@/common/constants/styles/color.style";
import { SearchInput, Title } from "@/components/admin";
import { SearchInputData } from "@/components/admin/SearchInput/SearchInput";
import { AdminThemeProvider } from "@/providers";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Backdrop,
  LinearProgress,
} from "@mui/material";
import { ImageField, ProductImage } from "./page.components";
import { usePage } from "./page.model";
import styles from "./page.module.css";

export default function CreateProduct() {
  const {
    form,
    handleCreateProduct,
    handleInvalid,
    handleSubmit,
    handleToggleRetroSwitch,
    loading,
    register,
    placeholder,
    setValue,
  } = usePage();

  const searchInputIdForClubId = "search-input-outlined-club-id";

  const clubData: SearchInputData[] = [
    { text: "Arsenal", value: "arsenal-uid" },
    { text: "Real Madrid", value: "real-madrid-uid" },
  ];

  const SelectedImages = form.productImages.items.map(({ file, isCover, key }) => (
    <ProductImage
      key={key}
      src={URL.createObjectURL(file)}
      isCover={isCover}
      onRemove={() => form.productImages.removeImageByKey(key)}
      onProductCover={() => {
        if (!isCover) form.productImages.setProductCoverByKey(key);
      }}
    />
  ));

  /* TODO: Add loader after submit. */
  return (
    <AdminThemeProvider>
      <main className="bg-transparent">
        <Title>Añadir Nuevo Producto</Title>
        <div className={`${styles.shadow} py-10 px-8 md:p-12 rounded-2xl bg-white`}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Título"
                placeholder={placeholder?.title}
                error={!!form.title.error}
                helperText={form.title.error?.message}
                name={form.title.name}
                onBlur={form.title.onBlur}
                onChange={form.title.onChange}
                ref={form.title.ref}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SearchInput
                id={searchInputIdForClubId}
                variant="outlined"
                fullWidth
                label="Club"
                placeholder={placeholder?.clubId}
                error={!!form.clubId.error}
                helperText={form.clubId.error?.message}
                data={clubData}
                onSelectResult={(_, value) => {
                  setValue("clubId", value);
                  if (!!form.clubId.error) form.clubId.setError(undefined);
                }}
                onDeselectResult={() => setValue("clubId", "")}
                sx={{
                  /* Change color of search text after desactivation (because there was selection) */
                  [`& #${searchInputIdForClubId}.Mui-disabled`]: {
                    WebkitTextFillColor: Color["admin-1"],
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={!!form.editions.error}
                disabled={form.editions.disabled}
              >
                <InputLabel>Edición</InputLabel>
                <Select
                  multiple
                  defaultValue={[]}
                  label="Edición"
                  name={form.editions.name}
                  onBlur={form.editions.onBlur}
                  onChange={form.editions.onChange}
                  ref={form.editions.ref}
                >
                  <MenuItem value={EJerseyEdition.FAN}>Fan</MenuItem>
                  <MenuItem value={EJerseyEdition.PLAYER}>Jugador</MenuItem>
                </Select>
                {!!form.editions.error?.message && (
                  <FormHelperText>{form.editions.error.message}</FormHelperText>
                )}
                {form.editions.disabled && (
                  <FormHelperText sx={{ color: "#999999" }}>
                    Se ha deshabilitado esta opción.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                {...register("isRetro")}
                control={<Switch onClick={handleToggleRetroSwitch} />}
                label="Retro"
                labelPlacement="start"
                sx={{ height: 53.13 }}
              />
            </Grid>
            <Grid item xs={12}>
              <ImageField
                onDrop={(event) => form.productImages.addImages(event.dataTransfer.files)}
                InputProps={{
                  onChange: (event) => form.productImages.addImages(event.target.files),
                }}
              />
              <div className="mt-3 flex flex-wrap gap-3">{SelectedImages}</div>
              {!!form.productImages.error && (
                <p className="mt-2 ml-[14px] text-xs text-admin-error">
                  {form.productImages.error.message}
                </p>
              )}
            </Grid>
          </Grid>
          <button
            className="mt-8 py-2 px-5 rounded-lg font-semibold text-sm text-white bg-blue-500 shadow transition-[background] duration-150 ease-in-out hover:bg-blue-600"
            onClick={handleSubmit(handleCreateProduct, handleInvalid)}
          >
            Guardar Producto
          </button>
        </div>
      </main>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <LinearProgress
          className="absolute top-0 w-full"
          sx={{ color: "rgb(59, 130, 246)" /* => bg-blue-500 */ }}
        />
      </Backdrop>
    </AdminThemeProvider>
  );
}
