'use client';

import {
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Sheet,
} from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
// import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { ISBN } from '@stdnum/isbn';
import type { Separator10 } from '@stdnum/isbn/dist/types/separator_10.js';
import type { Separator13 } from '@stdnum/isbn/dist/types/separator_13.js';
import React, { useEffect, useState, type ChangeEvent } from 'react';

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
    <p style={{ marginTop: '3em', textAlign: 'center' }}>© Караваев С. В., 2024</p>
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

  useEffect(() => {
    update();
  }, [format, originalIsbn, separator]);

  function update() {
    try {
      const isbn = new ISBN(originalIsbn);
      const isValid = isbn.validate();
      setValid(isValid);
      if (isValid) {
        if (format === 10) {
          if (isbn.length === 13 && isbn.integral.startsWith('979')) {
            setValid(false);
            setRemadeIsbn('');
          }
          else {
            setRemadeIsbn(isbn.convertTo10(separator as Separator10));
          }
        }
        else {
          setRemadeIsbn(isbn.convertTo13(separator as Separator13));
        }
      }
    }
    catch (event) {
      setValid(false);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setOriginalIsbn(event.target.value);
  }

  // function handleClick(event: MouseEvent<HTMLAnchorElement>) {
  //   update();
  // }

  function handleFormatChange(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (value === 13 && separator === ' ') {
      setSeparator('-');
    }
    setFormat(value);
  }

  function handleSeparatorChange(event: ChangeEvent<HTMLInputElement>) {
    setSeparator(event.target.value);
  }

  return (
    <React.Fragment>
      <CssVarsProvider>
        {/* <ModeToggle /> */}
        <Sheet variant="plain">
          <Grid container spacing={2} xsOffset={1}>
            <Grid paddingBottom={3} sm={10} xs={10} color="#000000">
              <h1>
                ISBN
                {' '}
                <span style={{ fontWeight: 'normal' }}>🕮</span>
              </h1>
              <p>Валидация и конверсия</p>
            </Grid>
            <Grid sm={5} xs={10}>
              <FormControl error={!valid}>
                <FormLabel>Ввод</FormLabel>
                <Input
                  defaultValue={originalIsbn}
                  onChange={handleChange}
                  placeholder="9780393040029"
                  required
                />
                <FormHelperText>
                  <Chip
                    color={valid ? 'success' : 'danger'}
                    variant="outlined"
                  >
                    {valid ? 'Валидный' : 'Невалидный'}
                  </Chip>
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid sm={5} xs={10}>
              <FormControl>
                <FormLabel>Вывод</FormLabel>
                <Input
                  disabled
                  placeholder=""
                  required
                  startDecorator=""
                  value={remadeIsbn}
                />
              </FormControl>
            </Grid>
            {/* <Grid sm={10} xs={10}>
              <Button
                fullWidth
                onClick={handleClick}
              >
                Обработать
              </Button>
            </Grid> */}
            <Grid sm={5} xs={10}>
              <FormControl>
                <FormLabel>Формат конверсии</FormLabel>
                <RadioGroup>
                  <Radio
                    checked={format === 10}
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
                <FormHelperText style={{ textAlign: 'justify', textIndent: '2em' }}>
                  <p>13­‑значные ISBN с префиксом 979 (например, 9791000000008) запрещено конвертировать в 10­‑значный формат.</p>
                </FormHelperText>
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
                    <Radio
                      checked={separator === ' '}
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
          <Grid sm={10} xs={10}>
            <Copyright />
          </Grid>
        </Sheet>
      </CssVarsProvider>
    </React.Fragment>
  );
}

export default Page;
