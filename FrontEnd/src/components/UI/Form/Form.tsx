import { SubmitHandler, useForm } from 'react-hook-form';
import { Grid, Stack } from '@mui/material';

import { IFormField } from 'models/app';
import MuiButton from 'components/UI/MuiButton';
import { useEffect } from 'react';
import FormFields from '../FormFields/FormFields';

interface Props {
  fields: IFormField[];
  buttonText?: string;
  defaultValues?: any;
  dir?: 'rtl' | 'ltr' | undefined;
  cb?: (data: any) => void;
  onChange?: (name: string, value: any) => void;
  validations?: any;
  reset?: Boolean;
  isHorizontal?: Boolean;
}



const Form: React.FC<Props> = ({ fields, buttonText, defaultValues, dir, cb, onChange, validations, reset, isHorizontal }) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset: _reset,
    register,
    formState: { errors, isSubmitting, isValid }
  } = useForm<any>({ defaultValues, });

  const onSubmit: SubmitHandler<any> = async (data: any) => cb && cb(data);

  useEffect(() => {
    if (reset) {
      _reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <>
      <form dir={dir}>
        {fields.length > 0 && (
          <Stack direction={isHorizontal ? 'row' : 'column'}>
            {fields.map((field: any) => (
              <Grid container key={field.name}>
                <Grid item xs={10}>
                  {!field.isEditor && (
                    <FormFields
                      {...field}
                      control={control}
                      errors={errors}
                      watch={watch}
                      setValue={setValue}
                      register={register}
                      onChange={(e: any) => {
                        onChange && onChange(field.name, !e ? null : e.target?.value! || e?.value! || e!);
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={2}>
                  {field.bulkAction && field.bulkActionLabel && field.bulkActionFn && (
                    <>
                      <MuiButton variant="text" color="primary" size="small" sx={{ textTransform: 'none' }} onClick={field.bulkActionFn}>
                        {field.bulkActionLabel}
                      </MuiButton>
                    </>
                  )}
                </Grid>
              </Grid>
            ))}
          </Stack>
        )}
        {buttonText && (
          <Grid container justifyContent="center" sx={{ py: 4 }}>
            <MuiButton size="large" variant="contained" type="submit" disabled={isSubmitting || Object.keys(errors).length > 0 || !isValid} sx={{ minWidth: 184 }} onClick={handleSubmit(onSubmit)}>
              {buttonText}
            </MuiButton>
          </Grid>
        )}
      </form>
    </>
  );
};

export default Form;
