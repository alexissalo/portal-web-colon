"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, User, Users, Heart, Phone, CheckCircle, Send, Home, AlertCircle } from "lucide-react"

const STORAGE_KEY = "registro_deportista_form"

const initialDatosPersonales = {
  nombre: "", dni: "", fechaNacimiento: "", domicilio: "",
  localidad: "", escolaridad: "", gradoEscolar: "", posicionJuego: "",
  altura: "", peso: "", id_disciplina: "", categoria: "",
}
const initialDatosFamiliares = {
  nombre: "", domicilio: "", localidad: "", telefono: "",
  telefonoFijo: "", facebookTutor: "", instagramTutor: "", emailResponsable: "",
}
const initialDatosMedicos = {
  grupoSanguineo: "", factor: "", coberturaMedica: "", numeroAfiliado: "",
  alergias: "", lesiones: "", patologias: "", tratamientos: "",
}
const initialComunicacion = {
  email: "", instagram: "", facebook: "", telefonoJugador: "", telefonoEmergencia: "",
}

export default function RegistroDeportista() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null) // { success, message, error }

  const [datosPersonales, setDatosPersonales] = useState(initialDatosPersonales)
  const [datosFamiliares, setDatosFamiliares] = useState(initialDatosFamiliares)
  const [datosMedicos, setDatosMedicos] = useState(initialDatosMedicos)
  const [comunicacion, setComunicacion] = useState(initialComunicacion)

  // 👇 Cargar datos guardados al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { datosPersonales: dp, datosFamiliares: df, datosMedicos: dm, comunicacion: c, step } = JSON.parse(saved)
        if (dp) setDatosPersonales(dp)
        if (df) setDatosFamiliares(df)
        if (dm) setDatosMedicos(dm)
        if (c) setComunicacion(c)
        if (step) setCurrentStep(step)
      }
    } catch {}
  }, [])

  // 👇 Guardar en localStorage cada vez que cambia algo
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        datosPersonales, datosFamiliares, datosMedicos, comunicacion, step: currentStep,
      }))
    } catch {}
  }, [datosPersonales, datosFamiliares, datosMedicos, comunicacion, currentStep])

  const clearStorage = () => {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  const disciplinas = [
    { id: 1, nombre: "Fútbol" }, { id: 2, nombre: "Básquet" },
    { id: 3, nombre: "Voley" }, { id: 4, nombre: "Tenis" }, { id: 5, nombre: "Patín" },
  ]
  const categorias = ["Pre-infantil", "Infantil", "Cadete", "Juvenil", "Senior", "Veteranos"]
  const gruposSanguineos = ["A", "B", "AB", "O"]
  const factores = ["+", "-"]

  const steps = [
    { number: 1, title: "Datos Personales", icon: User },
    { number: 2, title: "Datos Familiares", icon: Users },
    { number: 3, title: "Datos Médicos", icon: Heart },
    { number: 4, title: "Comunicación", icon: Phone },
  ]

  const validateStep = (step) => {
    switch (step) {
      case 1: return datosPersonales.nombre && datosPersonales.dni && datosPersonales.fechaNacimiento && datosPersonales.domicilio && datosPersonales.localidad && datosPersonales.id_disciplina
      case 2: return datosFamiliares.nombre && datosFamiliares.telefono && datosFamiliares.emailResponsable
      case 3: return datosMedicos.grupoSanguineo && datosMedicos.factor
      case 4: return comunicacion.telefonoEmergencia
      default: return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/solicitudes-deportista", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo_solicitud: "registro_deportista",
          datos_solicitud: { datosPersonales, datosFamiliares, datosMedicos, comunicacion },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        clearStorage()
        setSubmitResult({ success: true, solicitudId: data.solicitudId })
      } else if (response.status === 409) {
        setSubmitResult({ success: false, tipo: "duplicado", dni: datosPersonales.dni })
      } else {
        setSubmitResult({ success: false, tipo: "error", message: data.error })
      }
    } catch {
      setSubmitResult({ success: false, tipo: "error", message: "Error de conexión. Intentá nuevamente." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReintentar = () => setSubmitResult(null)

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
  const labelClass = "block text-sm font-medium text-gray-700 mb-2"

  // ————— PANTALLA DE ÉXITO —————
  if (submitResult?.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud enviada!</h2>
          <p className="text-gray-500 mb-6">
            Tu solicitud de inscripción fue registrada correctamente y sera revisada por nuestro equipo.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 text-left mb-6 space-y-2">
            <p className="text-sm font-semibold text-gray-700 mb-3">¿Qué pasa ahora?</p>
            {[
              "Revisaremos tu solicitud en un plazo de 24 a 48 horas hábiles.",
              "Te enviaremos un email al correo del responsable con la respuesta.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          {submitResult.solicitudId && (
            <p className="text-xs text-gray-400 mb-6">
              Número de solicitud: <strong>#{submitResult.solicitudId}</strong>
            </p>
          )}

          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  // ————— PANTALLA DE ERROR —————
  if (submitResult && !submitResult.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>

          {submitResult.tipo === "duplicado" ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Solicitud existente</h2>
              <p className="text-gray-500 mb-6">
                Ya existe una solicitud pendiente para el DNI <strong>{submitResult.dni}</strong>. No podés enviar otra hasta que la anterior sea procesada.
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Si creés que es un error, acercate a la Sede Social (Vicente López 170) para consultar el estado de tu solicitud.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Algo salió mal</h2>
              <p className="text-gray-500 mb-6">{submitResult.message || "Ocurrió un error al enviar la solicitud."}</p>
            </>
          )}

          <div className="flex flex-col gap-3">
            {submitResult.tipo !== "duplicado" && (
              <button
                onClick={handleReintentar}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Reintentar
              </button>
            )}
            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ————— FORMULARIO —————
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Solicitud de Inscripción</h1>
          <p className="text-gray-500">Completá todos los datos para enviar tu solicitud como deportista</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number
              return (
                <div key={step.number} className="flex flex-col items-center flex-1 relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    isCompleted ? "bg-green-500 text-white" : isActive ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <span className={`text-sm font-medium text-center hidden md:block ${isActive ? "text-red-600" : "text-gray-500"}`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Datos Personales del Deportista</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Nombre Completo *</label><input type="text" value={datosPersonales.nombre} onChange={(e) => setDatosPersonales({ ...datosPersonales, nombre: e.target.value })} className={inputClass} placeholder="Ingrese el nombre completo" /></div>
                <div><label className={labelClass}>DNI *</label><input type="number" value={datosPersonales.dni} onChange={(e) => setDatosPersonales({ ...datosPersonales, dni: e.target.value })} className={inputClass} placeholder="12345678" /></div>
                <div><label className={labelClass}>Fecha de Nacimiento *</label><input type="date" value={datosPersonales.fechaNacimiento} onChange={(e) => setDatosPersonales({ ...datosPersonales, fechaNacimiento: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Disciplina *</label>
                  <select value={datosPersonales.id_disciplina} onChange={(e) => setDatosPersonales({ ...datosPersonales, id_disciplina: e.target.value })} className={inputClass}>
                    <option value="">Seleccione una disciplina</option>
                    {disciplinas.map((d) => <option key={d.id} value={d.id}>{d.nombre}</option>)}
                  </select>
                </div>
                <div><label className={labelClass}>Domicilio *</label><input type="text" value={datosPersonales.domicilio} onChange={(e) => setDatosPersonales({ ...datosPersonales, domicilio: e.target.value })} className={inputClass} placeholder="Calle y número" /></div>
                <div><label className={labelClass}>Localidad *</label><input type="text" value={datosPersonales.localidad} onChange={(e) => setDatosPersonales({ ...datosPersonales, localidad: e.target.value })} className={inputClass} placeholder="Ciudad/Localidad" /></div>
                <div><label className={labelClass}>Categoría</label>
                  <select value={datosPersonales.categoria} onChange={(e) => setDatosPersonales({ ...datosPersonales, categoria: e.target.value })} className={inputClass}>
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className={labelClass}>Escolaridad</label><input type="text" value={datosPersonales.escolaridad} onChange={(e) => setDatosPersonales({ ...datosPersonales, escolaridad: e.target.value })} className={inputClass} placeholder="Nivel educativo" /></div>
                <div><label className={labelClass}>Grado Escolar</label><input type="text" value={datosPersonales.gradoEscolar} onChange={(e) => setDatosPersonales({ ...datosPersonales, gradoEscolar: e.target.value })} className={inputClass} placeholder="Año/Grado actual" /></div>
                <div><label className={labelClass}>Posición de Juego</label><input type="text" value={datosPersonales.posicionJuego} onChange={(e) => setDatosPersonales({ ...datosPersonales, posicionJuego: e.target.value })} className={inputClass} placeholder="Ej: Delantero, Base..." /></div>
                <div><label className={labelClass}>Altura (cm)</label><input type="number" step="0.01" value={datosPersonales.altura} onChange={(e) => setDatosPersonales({ ...datosPersonales, altura: e.target.value })} className={inputClass} placeholder="175" /></div>
                <div><label className={labelClass}>Peso (kg)</label><input type="number" step="0.01" value={datosPersonales.peso} onChange={(e) => setDatosPersonales({ ...datosPersonales, peso: e.target.value })} className={inputClass} placeholder="70" /></div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Datos del Responsable/Tutor</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Nombre del Responsable *</label><input type="text" value={datosFamiliares.nombre} onChange={(e) => setDatosFamiliares({ ...datosFamiliares, nombre: e.target.value })} className={inputClass} placeholder="Nombre completo" /></div>
                <div><label className={labelClass}>Email del Responsable *</label><input type="email" value={datosFamiliares.emailResponsable} onChange={(e) => setDatosFamiliares({ ...datosFamiliares, emailResponsable: e.target.value })} className={inputClass} placeholder="email@ejemplo.com" /></div>
                <div><label className={labelClass}>Teléfono Móvil *</label><input type="tel" value={datosFamiliares.telefono} onChange={(e) => setDatosFamiliares({ ...datosFamiliares, telefono: e.target.value })} className={inputClass} placeholder="11-1234-5678" /></div>
                <div><label className={labelClass}>Teléfono Fijo</label><input type="tel" value={datosFamiliares.telefonoFijo} onChange={(e) => setDatosFamiliares({ ...datosFamiliares, telefonoFijo: e.target.value })} className={inputClass} placeholder="011-4567-8901" /></div>
                <div><label className={labelClass}>Domicilio del Tutor</label><input type="text" value={datosFamiliares.domicilio} onChange={(e) => setDatosFamiliares({ ...datosFamiliares, domicilio: e.target.value })} className={inputClass} placeholder="Calle y número" /></div>
                <div><label className={labelClass}>Localidad del Tutor</label><input type="text" value={datosFamiliares.localidad} onChange={(e) => setDatosFamiliares({ ...datosFamiliares, localidad: e.target.value })} className={inputClass} placeholder="Ciudad/Localidad" /></div>
                <div><label className={labelClass}>Facebook del Tutor</label><input type="text" value={datosFamiliares.facebookTutor} onChange={(e) => setDatosFamiliares({ ...datosFamiliares, facebookTutor: e.target.value })} className={inputClass} placeholder="@usuario" /></div>
                <div><label className={labelClass}>Instagram del Tutor</label><input type="text" value={datosFamiliares.instagramTutor} onChange={(e) => setDatosFamiliares({ ...datosFamiliares, instagramTutor: e.target.value })} className={inputClass} placeholder="@usuario" /></div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Información Médica</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Grupo Sanguíneo *</label>
                  <select value={datosMedicos.grupoSanguineo} onChange={(e) => setDatosMedicos({ ...datosMedicos, grupoSanguineo: e.target.value })} className={inputClass}>
                    <option value="">Seleccione grupo sanguíneo</option>
                    {gruposSanguineos.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div><label className={labelClass}>Factor RH *</label>
                  <select value={datosMedicos.factor} onChange={(e) => setDatosMedicos({ ...datosMedicos, factor: e.target.value })} className={inputClass}>
                    <option value="">Seleccione factor</option>
                    {factores.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div><label className={labelClass}>Cobertura Médica</label><input type="text" value={datosMedicos.coberturaMedica} onChange={(e) => setDatosMedicos({ ...datosMedicos, coberturaMedica: e.target.value })} className={inputClass} placeholder="Obra social o prepaga" /></div>
                <div><label className={labelClass}>Número de Afiliado</label><input type="text" value={datosMedicos.numeroAfiliado} onChange={(e) => setDatosMedicos({ ...datosMedicos, numeroAfiliado: e.target.value })} className={inputClass} placeholder="Número de afiliado" /></div>
                <div className="md:col-span-2"><label className={labelClass}>Alergias</label><textarea value={datosMedicos.alergias} onChange={(e) => setDatosMedicos({ ...datosMedicos, alergias: e.target.value })} className={inputClass} rows="3" placeholder="Describí cualquier alergia conocida" /></div>
                <div className="md:col-span-2"><label className={labelClass}>Lesiones Previas</label><textarea value={datosMedicos.lesiones} onChange={(e) => setDatosMedicos({ ...datosMedicos, lesiones: e.target.value })} className={inputClass} rows="3" placeholder="Describí lesiones deportivas previas" /></div>
                <div className="md:col-span-2"><label className={labelClass}>Patologías</label><textarea value={datosMedicos.patologias} onChange={(e) => setDatosMedicos({ ...datosMedicos, patologias: e.target.value })} className={inputClass} rows="3" placeholder="Describí cualquier patología o condición médica" /></div>
                <div className="md:col-span-2"><label className={labelClass}>Tratamientos Actuales</label><textarea value={datosMedicos.tratamientos} onChange={(e) => setDatosMedicos({ ...datosMedicos, tratamientos: e.target.value })} className={inputClass} rows="3" placeholder="Describí medicamentos o tratamientos actuales" /></div>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Datos de Comunicación del Deportista</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelClass}>Email del Deportista</label><input type="email" value={comunicacion.email} onChange={(e) => setComunicacion({ ...comunicacion, email: e.target.value })} className={inputClass} placeholder="deportista@ejemplo.com" /></div>
                <div><label className={labelClass}>Teléfono de Emergencia *</label><input type="tel" value={comunicacion.telefonoEmergencia} onChange={(e) => setComunicacion({ ...comunicacion, telefonoEmergencia: e.target.value })} className={inputClass} placeholder="11-1234-5678" /></div>
                <div><label className={labelClass}>Teléfono del Deportista</label><input type="tel" value={comunicacion.telefonoJugador} onChange={(e) => setComunicacion({ ...comunicacion, telefonoJugador: e.target.value })} className={inputClass} placeholder="11-1234-5678" /></div>
                <div><label className={labelClass}>Instagram del Deportista</label><input type="text" value={comunicacion.instagram} onChange={(e) => setComunicacion({ ...comunicacion, instagram: e.target.value })} className={inputClass} placeholder="@usuario" /></div>
                <div className="md:col-span-2"><label className={labelClass}>Facebook del Deportista</label><input type="text" value={comunicacion.facebook} onChange={(e) => setComunicacion({ ...comunicacion, facebook: e.target.value })} className={inputClass} placeholder="@usuario o URL completa" /></div>
              </div>

              {/* Resumen */}
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de la solicitud</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                  {[
                    ["Deportista", datosPersonales.nombre],
                    ["DNI", datosPersonales.dni],
                    ["Disciplina", disciplinas.find((d) => d.id == datosPersonales.id_disciplina)?.nombre || "—"],
                    ["Responsable", datosFamiliares.nombre],
                    ["Email responsable", datosFamiliares.emailResponsable],
                    ["Tel. emergencia", comunicacion.telefonoEmergencia],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-2">
                      <span className="font-medium text-gray-600 flex-shrink-0">{label}:</span>
                      <span className="text-gray-900">{value || "—"}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Esta es una solicitud de inscripción. Será revisada por el equipo administrativo y recibirás una respuesta por email en 24-48 horas hábiles.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" /> Anterior
            </button>

            <span className="text-sm text-gray-400">Paso {currentStep} de {steps.length}</span>

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!validateStep(currentStep)}
                className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!validateStep(currentStep) || isSubmitting}
                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />Enviando...</>
                ) : (
                  <><Send className="w-5 h-5 mr-2" />Enviar Solicitud</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}