# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

El asistente del secretario municipal recibe oficios físicos y los registra para poder consultarlos posteriormente.

## Product Purpose

Mantener un registro de los oficios recibidos por Secretaría Municipal. El asistente debe poder capturar los datos que tiene a la vista en el documento y recuperar el registro cuando lo necesite.

## Operating Context

La captura comienza con un oficio en papel. El asistente inicia sesión, abre el formulario de registro, captura el folio manualmente y selecciona la comunidad y una o más áreas de destino. Puede adjuntar el PDF del oficio desde el formulario. Los registros se consultan desde la aplicación interna.

## Capabilities and Constraints

- El alcance confirmado para el asistente es capturar y consultar oficios recibidos.
- El folio se captura manualmente. El formato actual de la API admite enteros positivos.
- El formulario conserva el destinatario y la dependencia. Los campos de remitente, cargo del remitente y cargo del destinatario se retiraron de la captura.
- Los desplegables de comunidades y áreas de destino permiten buscar por nombre. El selector de áreas admite selección múltiple.
- La interfaz de trabajo está en español.

## Product Principles

- Usar los términos que el asistente reconoce en el oficio y en el registro municipal.
- Facilitar la captura repetida desde papel con campos fáciles de identificar y corregir.
- Facilitar la recuperación de un registro a partir de los datos disponibles en el oficio.
