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

<div align="left">
1.**Seleccione la base que se desea obtener**
</div>

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/779f0442-1ccc-47e7-93dd-a4efdb6195cf)

2.**De click en la nube ☁** (Automáticamente empezará el proceso de descarga de la base seleccionada)

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/4e32378f-7a5b-4bfc-be9e-1b82ada768c6)

3.El **archivo** quedará en la **carpeta 🗂** de descarga que tenga por efecto en su **navegador** (Verá el archivo en la parte superior derecha y el mensaje de **Descarga Finalizada**)

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/7fb95ab7-2191-444b-a214-874c22ea3560)

# Descarga de más bases por medio de link
Descargar mediante **link** bases de la **API Datos Abiertos**.

1.Selecciona **+Bases** de la lista desplegable y da **click** en la **nube ☁**

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/12a027f7-d1cb-428f-95ec-b7ca05485bab)

2.**Escriba** o pegué el **link** de la base en el **input**(Campo habilitado), luego de **click en Aceptar**

![image](https://github.com/EGROJ182/app-invima-EGROJ182/assets/109677233/2dd87614-74bd-428a-b0f6-49edf182cac8)

3.Automáticamente empezará el proceso de descarga de la base (Si existe el **link** y **no tiene extensión al finalizar la cadena de texto** EJEMPLO: **".json"**)
