<h1 align="center">
      app-invima-EGROJ182
</h1>
<div align="justify">
Esta aplicación la cree con el fin de conectar con la <strong>API de Datos Abiertos</strong> que aloja la información del <strong>INVIMA</strong> y otras entidades públicas en bases <strong>Soql</strong> en <strong>SOCRATA</strong>.
</div>

# Objetivo:


      - Consultar el estado completo e información de los medicamentos registrados en el invima por expediente y consecutivo asignado por presentación comercial de cada medicamento.


<h1 align="center">
Función principal
</h1>

      - Permite traer toda la información necesaria para realizar la validación de cada medicamento en tiempo real para conocer su estado, vigencia, fecha de vencimiento etc...


<div align="justify">
Además permite descargar pegando el link cualquier base que se encuentra en datos abiertos haciendo una conversión de los datos ya que por medio de la pagina de datos abiertos los archivos no son compatibles con UFT8 por ende todos los caracteres especiales no son legibles; con esto podrán obtener las bases completas en extensión <strong>(csv)</strong>.
</div>

# Home
Inicio de la pagina

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/eeaea35b-b40f-469b-81ba-bb18176f83da)

# Descarga de bases
Dando **click**👆 en la nube podrá descargar las bases.

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/7fae180d-6057-4d28-8d39-b12481a884e1)

# Pasos para descarga de bases

<div align="justify">
Por defecto se encuentran las bases de medicamentos del <strong>**INVIMA**</strong> las cuales se dividen en estados; de igual manera encontrara la base de <strong>PRECIOS MAXIMOS DE VENTA MEDICAMENTOS</strong> por expediente y su consecutivo correspondiente.
</div>

# **Bases por Defecto**

<div align="center">
<img align='center' src="https://lh3.googleusercontent.com/pw/ABLVV85MwmccWRIACPhRGIMYhkTtKvAunJGzvG7Hy3cps4KydngiHNXynzl3gjXFgTCKniu-7zjwFMAKg-GF2zMqUoPJJLAyPUgEO7K8AlC0qC28Ryr48dwNSCgGEhmEnE5PNN9gKiTvaUvKHn9UGV98HNmhMA=w412-h232-s-no-gm?authuser=1" width="400">
</div>

1. **Seleccione la base que se desea obtener**

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/779f0442-1ccc-47e7-93dd-a4efdb6195cf)

2. **De click en la nube ☁** (Automáticamente empezará el proceso de descarga de la base seleccionada)

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/4e32378f-7a5b-4bfc-be9e-1b82ada768c6)

3. El **archivo** quedará en la **carpeta 🗂** de descarga que tenga por efecto en su **navegador** (Verá el archivo en la parte superior derecha y el mensaje de **Descarga Finalizada**)

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/7fb95ab7-2191-444b-a214-874c22ea3560)

# Descarga de más bases por medio de link
Descargar mediante **link** bases de la **API Datos Abiertos**.

1. Selecciona **+Bases** de la lista desplegable y da **click** en la **nube ☁**

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/12a027f7-d1cb-428f-95ec-b7ca05485bab)

2. **Escriba** o pegué el **link** de la base en el **input**(Campo habilitado), luego de **click en Aceptar**

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/54f766b6-de3d-4d60-a569-765c27744204)

3. Automáticamente empezará el proceso de descarga de la base (Si existe el **link** y **no tiene extensión al finalizar la cadena de texto** EJEMPLO: **".json"**)

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/4e2393ed-e0b5-4bd0-b424-877959ff3adb)

# Consultas de la App

<div align="justify">
Para realizar las <b>consultas</b> desde la pagina se dejaron varias formas de obtener la <b>información</b>. <b>Consulta por Expediente</b>, <b>consulta por expediente + consecutivo</b> y <b>consulta de forma personalizada</b> (<b>Nombre del medicamento</b>, <b>laboratorio</b>, <b>registro sanitario</b>, <b>estado de registro</b>, <b>descripcion comercial</b>, <b>concentración</b>, <b>ATC</b>, <b>forma farmacéutica</b>, <b>principio activo</b>, <b>vía de administración</b>).
</div>

# Consulta por Expediente y Consecutivo
Ingrese el **expediente** del **medicamento** con un **consecutivo** y de **click** en **Consultar**.

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/0704d338-d63f-4946-9c8c-728e3c3942a1)

Automáticamente se realizara la consulta en las bases de medicamentos del Invima

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/f86e0f5f-fe99-4489-949e-2e53dadac175)

<div align="justify">
En el <b>contenedor inferior izquierdo</b> se creará otra <b>busqueda</b>; en este caso por solo el <b>expediente</b> con el fin de al dar <b>click</b>, se obtengan todas las <b>presentaciones comerciales por consecutivo</b>; si así lo desea el <b>usuario</b>.
</div>

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/81fe88f3-4093-4c7c-934e-912e597e3cf0)

<div align="justify">
Observamos en el <b>contenedor derecho del resultado de la consulta</b> todas las <b>presentaciones comerciales por consecutivo</b>; de igual manera en el <b>contenedor inferior izquierdo</b> se crearán por cada <b>consecutivo</b> un contenedor por si desea realizar consulta el <b>usuario</b> por un <b>consecutivo</b> en específico.
</div>

Si el **usuario** da **click** en un contenedor inferior izquierdo se realizara la **consulta** de ese contenedor (**Sea por expediente y consecutivo o solo expediente**).

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/9735e191-b793-4b9f-9e3c-092ea2895858)
