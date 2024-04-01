'use client';

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
} from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
// import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { ISBN } from '@stdnum/isbn';
import type { Separator10 } from '@stdnum/isbn/dist/types/separator_10.js';
import type { Separator13 } from '@stdnum/isbn/dist/types/separator_13.js';
import React, { useState, type ChangeEvent } from 'react';

// function ModeToggle() {
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = React.useState(false);

//   // necessary for server-side rendering
//   // because mode is undefined on the server
//   React.useEffect(() => {
//     setMounted(true);
//   }, []);
//   if (!mounted) {
//     return null;
//   }

//   return (
//     <Button
//       variant="outlined"
//       onClick={() => {
//         setMode(mode === 'light' ? 'dark' : 'light');
//       }}
//     >
//       {mode === 'light' ? 'Turn dark' : 'Turn light'}
//     </Button>
//   );
// }

function Copyright() {
  return (
    <Typography paddingTop={6} textAlign="center">
      <p>© Караваев С. В., 2024</p>
    </Typography>
  );
}

/**
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page}
 */
function Page(
  // {
  //   params,
  //   searchParams,
  // }: {
  //   params: { slug: string };
  //   searchParams: Record<string, string | string[] | undefined>;
  // },
) {
  // const { mode, setMode } = useColorScheme();

  const [originalIsbn, setOriginalIsbn] = useState('9780393040029');
  const [remadeIsbn, setRemadeIsbn] = useState('');

  const [valid, setValid] = useState(true);

  // const [validate, setValidate] = useState(true);
  const [format, setFormat] = useState(13);
  const [separator, setSeparator] = useState('-');

  function handleFormatChange(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (value === 13 && separator === ' ') {
      setSeparator('-');
    }
    setFormat(value);
  }

  function handleSeparatorChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.disabled) {
      setSeparator(event.target.value);
    }
  }

  return (
    <React.Fragment>
      <CssVarsProvider>
        {/* <ModeToggle /> */}
        <Sheet variant="plain">

          <Grid container spacing={1} xsOffset={1}>
            <Grid paddingBottom={3} sm={10} xs={10} color="#000000">
              <h1>
                ISBN
                {' '}
                <span style={{ fontWeight: 'normal' }}>🕮</span>
              </h1>
              <p>Конверсия и валидация</p>
            </Grid>
            <Grid sm={5} xs={10}>
              <FormControl error={!valid}>
                <FormLabel>Ввод</FormLabel>
                <Input
                  onChange={(event) => {
                    setRemadeIsbn('');
                    setOriginalIsbn(event.target.value);
                  }}
                  placeholder="9780393040029"
                  required
                  value={originalIsbn}
                />
                <FormHelperText>
                  {/* <InfoOutlined /> */}
                  {/* 10&#x2011; или 13&#xad;&#x2011;значный идентификатор */}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid sm={5} xs={10}>
              <FormControl>
                <FormLabel>Вывод</FormLabel>
                <Input
                  placeholder=""
                  required
                  startDecorator=""
                  value={remadeIsbn}
                />
              </FormControl>
            </Grid>
            <Grid sm={10} xs={10}>
              <Button
                fullWidth
                onClick={() => {
                  try {
                    const isbn = new ISBN(originalIsbn);

                    setValid(isbn.validate());

                    if (format === 10) {
                      if (isbn.length === 13
                        && isbn.integral.startsWith('979')) {
                        setValid(false);
                      }
                      else {
                        setRemadeIsbn(isbn.convertTo10(separator as Separator10));
                      }
                    }
                    else {
                      setRemadeIsbn(isbn.convertTo13(separator as Separator13));
                    }
                  }
                  catch (event) {
                  }
                }}
              >
                Обработать
              </Button>
            </Grid>
            <Grid sm={5} xs={10}>
              <FormControl>
                <FormLabel>Формат</FormLabel>
                <RadioGroup>
                  <Radio
                    checked={format === 10}
                    disabled={originalIsbn.startsWith('979')}
                    label="10­‑разрядный"
                    onChange={handleFormatChange}
                    value="10"
                  />
                  <Radio
                    checked={format === 13}
                    label="13­‑разрядный"
                    onChange={handleFormatChange}
                    value="13"
                  />
                </RadioGroup>
              </FormControl>
              {/* <Switch
                // slotProps={{
                //   track: {
                //     children: (
                //       <React.Fragment>
                //         <span>⏽</span>
                //         <span>⭘</span>
                //       </React.Fragment>
                //     ),
                //     sx: {
                //       justifyContent: ' -around',
                //     },
                //   },
                // }}
                // sx={{
                //   '--Switch-thumbSize': '27px',
                //   '--Switch-trackWidth': '52px',
                //   '--Switch-trackHeight': '31px',
                // }}
                checked={validate}
                endDecorator={validate ? 'Валидировать' : 'Не валидировать'}
                onChange={(event) => { setValidate(event.target.checked); }}
              /> */}
            </Grid>

            <Grid sm={5} xs={10}>
              <FormControl>
                <FormLabel>Разделитель элементов</FormLabel>
                <RadioGroup>
                  <FormControl>
                    {/* // disabled={!validate} */}
                    <Radio
                      checked={separator === ''}
                      label="Отсутствует"
                      onChange={handleSeparatorChange}
                      slotProps={{ input: { 'aria-describedby': '' } }}
                      value=""
                    />
                    <FormHelperText id="-separator">
                      {/* ISO&nbsp;2108:1970/1978? */}
                      <i lang="en">ISO&nbsp;2108:1992/2005/2017</i>
                      .
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    {/* disabled={!validate || format !== 10} */}
                    <Radio
                      checked={format === 10 && separator === ' '}
                      disabled={format === 13}
                      label="Пробел (U+0020)"
                      onChange={handleSeparatorChange}
                      slotProps={{ input: { 'aria-describedby': ' -separator' } }}
                      value=" "
                    />
                    <FormHelperText id=" -separator">
                      {/* ISO 2108:1970/1978? */}
                      <i lang="en">ISO&nbsp;2108:1992</i>
                      . Только для
                      <i lang="en">ISBN&#x2011;10</i>
                      .
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    {/* disabled={!validate} */}
                    <Radio
                      checked={separator === '-'}
                      label="Дефис­‑минус (U+002D)"
                      onChange={handleSeparatorChange}
                      slotProps={{ input: { 'aria-describedby': '--minus-separator' } }}
                      value="-"
                    />
                    <FormHelperText id="--minus-separator">
                      {/* ISO 2108:1970/1978? */}
                      {/* <i lang="en">ISO&nbsp;2108:1992/2005/2017</i> */}
                      {/* ГОСТ&nbsp;7.53&#x2011;86, */}
                      {/* ГОСТ&nbsp;7.53&#x2011;2001, */}
                      {/* ГОСТ&nbsp;Р&nbsp;7.0.53&#x2011;2007. */}
                      ISO 2108, ГОСТ&nbsp;7.53, ГОСТ&nbsp;Р&nbsp;7.0.53
                    </FormHelperText>
                  </FormControl>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid sm={12} xs={12}>
            <Copyright />
          </Grid>
        </Sheet>
      </CssVarsProvider>
    </React.Fragment>
  );
}

export default Page;
