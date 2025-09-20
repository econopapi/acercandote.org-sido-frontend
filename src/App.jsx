import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const SurveyForm = () => {
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    id_organizacion: '',
    apellidos: '',
    nombres: '',
    edad: '',
    id_genero: '',
    id_rol_organizacion: '',
    anos_organizacion: '',
    horas_semanales: '',
    id_porcentaje_trabajo_remoto: '',
    id_nivel_nivel_placer_interes: '',
    id_nivel_tristeza_desesperanza: '',
    id_nivel_problemas_sueno: '',
    id_nivel_disminucion_energia: '',
    id_nivel_cambio_apetito: '',
    id_nivel_decepcion_personal: '',
    id_nivel_problemas_concentracion: '',
    id_nivel_movimientos_involuntarios: '',
    id_nivel_tentacion_no_levantarse: '',
    id_frecuencia_limitacion_convivencia: '',
    id_frecuencia_desacreditar_profesionalismo: '',
    id_frecuencia_desprestigio: '',
    id_frecuencia_informar_mal_permanencia: '',
    id_nivel_estudios: '',
    id_estado_nacimiento: '',
    id_estado_mas_anos: '',
    id_municipio: '',
    id_estado_civil_padres: '',
    id_familiares_diabetes: '',
    id_familiares_cancer: '',
    id_familiares_cerebrovascular: ''
  });

  // Estado para controlar la sección activa
  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rolesOrganizacion, setRolesOrganizacion] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [estadosMexico, setEstadosMexico] = useState([]);
  const [municipiosMexico, setMunicipiosMexico] = useState([]);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);

  // Opciones para los campos de selección
  const opciones = {
    genero: [
      { id: 1, label: 'Femenino' },
      { id: 2, label: 'Masculino' },
      { id: 3, label: 'No binario' },
      { id: 4, label: 'Prefiero no decir' }
    ],
    porcentaje_remoto: [
      { id: 1, label: '0%' },
      { id: 2, label: '10%' },
      { id: 3, label: '25%' },
      { id: 4, label: '50%' },
      { id: 5, label: '75%' },
      { id: 6, label: '100%' },
    ],
    nivel_estudios: [
      { id: 1, label: 'Primaria no concluida' },
      { id: 2, label: 'Primaria' },
      { id: 3, label: 'Secundaria no concluida' },
      { id: 4, label: 'Secundaria' },
      { id: 5, label: 'Bachillerato no concluido' },
      { id: 6, label: 'Bachillerato' },
      { id: 7, label: 'Licenciatura no terminada' },
      { id: 8, label: 'Licenciatura' },
      { id: 9, label: 'Posgrado' }
    ],
    estado_civil_padres: [
      { id: 1, label: 'Soltera/o' },
      { id: 2, label: 'Casada/o' },
      { id: 3, label: 'Divorciada/o' },
      { id: 4, label: 'Separada/o' },
      { id: 5, label: 'Viuda/o' }
    ],
    respuestas_si_no: [
      { id: 1, label: 'Sí' },
      { id: 2, label: 'No' },
      { id: 3, label: 'No sé' },
      { id: 4, label: 'Prefiero no decir' }
    ],
    escala_likert_frecuencia: [
      { id: 1, label: 'Nunca' },
      { id: 2, label: 'En pocas ocasiones' },
      { id: 3, label: 'En algunas ocasiones' },
      { id: 4, label: 'En varias ocaciones' },
      { id: 5, label: 'Siempre' }
    ],
    escala_likert_intensidad: [
      { id: 1, label: 'Nada' },
      { id: 2, label: 'Poco' },
      { id: 3, label: 'Medio' },
      { id: 4, label: 'Mucho' },
      { id: 5, label: 'Demasiado' }
    ]
  };

  // Cargar datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Cargar organizaciones
        const organizacionesResponse = await fetch(`${import.meta.env.VITE_API_URL}/encuestas/laboral-salud-mental/preguntas/organizaciones`);
        if (organizacionesResponse.ok) {
          const organizacionesData = await organizacionesResponse.json();
          const organizacionesFormateadas = organizacionesData.organizaciones.map(org => ({
            id: org.id,
            label: org.nombre
          }));
          setOrganizaciones(organizacionesFormateadas);
        } else {
          console.error('Error al cargar organizaciones');
        }

        // Cargar roles de organización
        const rolesResponse = await fetch(`${import.meta.env.VITE_API_URL}/encuestas/laboral-salud-mental/preguntas/roles-organizacion`);
        if (rolesResponse.ok) {
          const rolesData = await rolesResponse.json();
          const rolesFormateados = rolesData.roles.map(role => ({
            id: role.id,
            label: role.nombre
          }));
          setRolesOrganizacion(rolesFormateados);
        } else {
          console.error('Error al cargar roles de organización');
        }

        // Cargar estados de México
        const estadosResponse = await fetch(`${import.meta.env.VITE_API_URL}/encuestas/laboral-salud-mental/preguntas/estados-mexico`);
        if (estadosResponse.ok) {
          const estadosData = await estadosResponse.json();
          const estadosFormateados = estadosData.estados.map(estado => ({
            id: estado.id,
            label: estado.nombre
          }));
          setEstadosMexico(estadosFormateados);
        } else {
          console.error('Error al cargar estados de México');
        }
      } catch (error) {
        console.error('Error en la solicitud de datos:', error);
      }
    };

    fetchData();
  }, []);

  // Secciones del formulario
  const sections = [
    { title: "Datos Básicos", icon: "👤" },
    { title: "Información Laboral", icon: "💼" },
    { title: "Evaluación de Bienestar", icon: "😊" },
    { title: "Ambiente Laboral", icon: "🏢" },
    { title: "Información Personal", icon: "👪" },
    { title: "Antecedentes Familiares", icon: "🧬" },
    { title: "Revisión", icon: "📋" }
  ];

  // Función para cargar municipios basados en el estado seleccionado
  const cargarMunicipios = async (estadoId) => {
    if (!estadoId) {
      setMunicipiosMexico([]);
      return;
    }
    
    setLoadingMunicipios(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/encuestas/laboral-salud-mental/preguntas/municipios-mexico?estado=${estadoId}`);
      if (response.ok) {
        const data = await response.json();
        const municipiosFormateados = data.municipios.map(municipio => ({
          id: municipio.id,
          label: municipio.nombre
        }));
        setMunicipiosMexico(municipiosFormateados);
      } else {
        console.error('Error al cargar municipios');
        setMunicipiosMexico([]);
      }
    } catch (error) {
      console.error('Error en la solicitud de municipios:', error);
      setMunicipiosMexico([]);
    } finally {
      setLoadingMunicipios(false);
    }
  };

  // Función para manejar cambios en los inputs
  const handleInputChange = (e, fieldName) => {
    if (e.target) {
      // Manejo para inputs estándar
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));

      // Si se cambió el estado donde ha vivido más años, cargar municipios
      if (name === 'id_estado_mas_anos') {
        cargarMunicipios(value);
        // Limpiar municipio seleccionado cuando se cambie el estado
        setFormData((prevData) => ({
          ...prevData,
          id_estado_mas_anos: value,
          id_municipio: ''
        }));
      }
    } else {
      // Manejo para react-select
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: e ? e.id : '' // Actualiza el estado con el ID seleccionado o vacío si se limpia
      }));
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Determinar valor de id_organizacion
    let organizacionValue;
    const organizacionSeleccionada = organizaciones.find(org => org.id === formData.id_organizacion);
    if (organizacionSeleccionada) {
      //organización existente, enviar como int
      organizacionValue = parseInt(formData.id_organizacion);
    } else {
      //nueva organización, enviar como string
      organizacionValue = formData.id_organizacion;
    }

    // Convertir todos los valores a números donde corresponda
    const body = {
      id_organizacion: organizacionValue,
      apellidos: formData.apellidos,
      nombres: formData.nombres,
      edad: parseInt(formData.edad),
      id_genero: parseInt(formData.id_genero),
      id_rol_organizacion: parseInt(formData.id_rol_organizacion),
      anos_organizacion: parseInt(formData.anos_organizacion),
      horas_semanales: parseInt(formData.horas_semanales),
      id_porcentaje_trabajo_remoto: parseInt(formData.id_porcentaje_trabajo_remoto),
      id_nivel_placer_interes: parseInt(formData.id_nivel_placer_interes),
      id_nivel_tristeza_desesperanza: parseInt(formData.id_nivel_tristeza_desesperanza),
      id_nivel_problemas_sueno: parseInt(formData.id_nivel_problemas_sueno),
      id_nivel_disminucion_energia: parseInt(formData.id_nivel_disminucion_energia),
      id_nivel_cambio_apetito: parseInt(formData.id_nivel_cambio_apetito),
      id_nivel_decepcion_personal: parseInt(formData.id_nivel_decepcion_personal),
      id_nivel_problemas_concentracion: parseInt(formData.id_nivel_problemas_concentracion),
      id_nivel_movimientos_involuntarios: parseInt(formData.id_nivel_movimientos_involuntarios),
      id_nivel_tentacion_no_levantarse: parseInt(formData.id_nivel_tentacion_no_levantarse),
      id_frecuencia_limitacion_convivencia: parseInt(formData.id_frecuencia_limitacion_convivencia),
      id_frecuencia_desacreditar_profesionalismo: parseInt(formData.id_frecuencia_desacreditar_profesionalismo),
      id_frecuencia_desprestigio: parseInt(formData.id_frecuencia_desprestigio),
      id_frecuencia_informar_mal_permanencia: parseInt(formData.id_frecuencia_informar_mal_permanencia),
      id_nivel_estudios: parseInt(formData.id_nivel_estudios),
      id_estado_nacimiento: parseInt(formData.id_estado_nacimiento),
      id_estado_mas_anos: parseInt(formData.id_estado_mas_anos),
      id_municipio: parseInt(formData.id_municipio),
      id_estado_civil_padres: parseInt(formData.id_estado_civil_padres),
      id_familiares_diabetes: parseInt(formData.id_familiares_diabetes),
      id_familiares_cancer: parseInt(formData.id_familiares_cancer),
      id_familiares_cerebrovascular: parseInt(formData.id_familiares_cerebrovascular)
    };

    console.log('[DEBUG] Datos para enviar a la API:', body);
    
    try {
      console.log(`${import.meta.env.VITE_API_URL}/encuestas/laboral-salud-mental/respuestas`)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/encuestas/laboral-salud-mental/respuestas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        alert('Formulario enviado con éxito');
        setActiveSection(0); // Resetear al inicio
      } else {
        alert('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para avanzar a la siguiente sección
  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
      window.scrollTo(0, 0);
    }
  };

  // Función para retroceder a la sección anterior
  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      window.scrollTo(0, 0);
    }
  };

  // Renderizar la barra de progreso
  const renderProgressBar = () => (
    <div className="mb-8">
    <div className="flex justify-between items-center mb-1">
        
        <div className="flex items-center space-x-3">
            <img
            src="https://acercandote.org/wp-content/uploads/elementor/thumbs/cropped-uam_logo-1-ptslvvpkscrlva865q5opxyghrqx0326qwn1p4vobs.png"
            alt="Logo"
            className="w-10 h-10 rounded-full"
            />
            <h2 className="text-3xl font-bold text-blue-600">acercándote.org</h2>
        </div>


        <span className="text-sm font-medium text-arial-600 bg-indigo-100 px-3 py-1 rounded-full">
            {activeSection + 1} de {sections.length}
        </span>

    
    </div>

      <div className="mb-2">
        <p className="text-lg text-gray-700">Sistema Integral de Diagnóstico Organizacional (SIDO)</p>
      </div>

      
      <div className="flex items-center space-x-2 mb-2">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index <= activeSection ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
      
      <div className="flex justify-between">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`text-xs text-center mt-2 ${
              index <= activeSection ? 'text-indigo-700 font-medium' : 'text-gray-500'
            }`}
            style={{ width: `${100 / sections.length}%` }}
          >
            <div className="text-lg mb-1">{section.icon}</div>
            {section.title}
          </div>
        ))}
      </div>
    </div>
  );

// Renderizar controles de navegación
const renderNavigation = () => (
    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={prevSection}
        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
        disabled={activeSection === 0}
      >
        ← Anterior
      </button>
  
      {activeSection < sections.length - 1 ? (
        <button
          type="button"
          onClick={nextSection}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          Siguiente →
        </button>
      ) : (
        <button
          type="button" // Cambiado a "button" para evitar envío automático
          onClick={handleSubmit} // Llama a handleSubmit explícitamente
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </>
          ) : (
            'Enviar Encuesta'
          )}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          {renderProgressBar()}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sección 1: Datos básicos */}
            {activeSection === 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-indigo-800 flex items-center">
                  <span className="bg-indigo-100 p-2 rounded-lg mr-3">👤</span>
                  Datos Básicos
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Campo de Organización con CreatableSelect */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organización</label>
                    <CreatableSelect
                      options={organizaciones}
                      getOptionLabel={(e) => e.label}
                      getOptionValue={(e) => e.id}
                      value={
                        // Verificar si es organización existente o nueva
                        organizaciones.find(org => org.id === formData.id_organizacion) || 
                        (formData.id_organizacion && typeof formData.id_organizacion === 'string' ? 
                          { id: formData.id_organizacion, label: formData.id_organizacion } : null)
                      }
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          // Si es una nueva organización creada, el id será el string ingresado
                          if (selectedOption.__isNew__) {
                            setFormData((prevData) => ({
                              ...prevData,
                              id_organizacion: selectedOption.value
                            }));
                          } else {
                            // Es una organización existente
                            setFormData((prevData) => ({
                              ...prevData,
                              id_organizacion: selectedOption.id
                            }));
                          }
                        } else {
                          // Se limpió el campo
                          setFormData((prevData) => ({
                            ...prevData,
                            id_organizacion: ''
                          }));
                        }
                      }}
                      onCreateOption={(inputValue) => {
                        // Cuando se crea una nueva opción
                        setFormData((prevData) => ({
                          ...prevData,
                          id_organizacion: inputValue
                        }));
                      }}
                      formatCreateLabel={(inputValue) => `Crear organización: "${inputValue}"`}
                      placeholder="Buscar o crear organización..."
                      className="w-full"
                      styles={{
                        control: (base) => ({
                          ...base,
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #D1D5DB',
                          '&:hover': { borderColor: '#D1D5DB' }
                        })
                      }}
                      isClearable
                      isLoading={organizaciones.length === 0}
                      required
                      noOptionsMessage={({ inputValue }) => 
                        inputValue ? `Presiona Enter para crear "${inputValue}"` : 'Escribe para buscar organizaciones'
                      }
                      createOptionPosition="first"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                    <input
                      type="text"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombres</label>
                    <input
                      type="text"
                      name="nombres"
                      value={formData.nombres}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                    <input
                      type="number"
                      name="edad"
                      value={formData.edad}
                      onChange={handleInputChange}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (value < 14 || value > 99) {
                          alert("La edad debe estar entre 14 y 99 años.");
                          setFormData((prevData) => ({
                            ...prevData,
                            edad: "",
                          }));
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                    <select
                      name="id_genero"
                      value={formData.id_genero}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {opciones.genero.map(opcion => (
                        <option key={opcion.id} value={opcion.id}>{opcion.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Sección 2: Información laboral */}
            {activeSection === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-indigo-800 flex items-center">
                  <span className="bg-indigo-100 p-2 rounded-lg mr-3">💼</span>
                  Información Laboral
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rol en la Organización</label>
                    <Select
                      options={rolesOrganizacion}
                      getOptionLabel={(e) => e.label}
                      getOptionValue={(e) => e.id}
                      value={rolesOrganizacion.find(
                        (opcion) => opcion.id === formData.id_rol_organizacion
                      )}
                      onChange={(selectedOption) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          id_rol_organizacion: selectedOption ? selectedOption.id : ''
                        }))
                      }
                      placeholder="Buscar..."
                      className="w-full"
                      styles={{
                        control: (base) => ({
                          ...base,
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #D1D5DB',
                          '&:hover': { borderColor: '#D1D5DB' }
                        })
                      }}
                      isClearable
                      isLoading={rolesOrganizacion.length === 0}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Años en la Organización</label>
                    <input
                      type="number"
                      name="anos_organizacion"
                      value={formData.anos_organizacion}
                      onChange={handleInputChange}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (value < 0 || value > 60) {
                          alert("Los años deben estar entre 0 y 60.");
                          setFormData((prevData) => ({
                            ...prevData,
                            anos_organizacion: "",
                          }));
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Horas trabajadas por semana</label>
                    <input
                      type="number"
                      name="horas_semanales"
                      value={formData.horas_semanales}
                      onChange={handleInputChange}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (value < 1 || value > 112) {
                          alert("Las horas deben estar entre 1 y 112.");
                          setFormData((prevData) => ({
                            ...prevData,
                            horas_semanales: "",
                          }));
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Porcentaje de trabajo remoto</label>
                    <select
                      name="id_porcentaje_trabajo_remoto"
                      value={formData.id_porcentaje_trabajo_remoto}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {opciones.porcentaje_remoto.map(opcion => (
                        <option key={opcion.id} value={opcion.id}>{opcion.label}</option>
                      ))}
                    </select>              
                  </div>
                </div>
              </div>
            )}

            {/* Sección 3: Evaluación de Bienestar */}
            {activeSection === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-indigo-800 flex items-center">
                  <span className="bg-indigo-100 p-2 rounded-lg mr-3">😊</span>
                  Evaluación de Bienestar
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      name: "id_nivel_placer_interes",
                      label: "¿Qué nivel de placer o interés experimentas hacia las diferentes actividades o cosas?",
                      options: opciones.escala_likert_intensidad
                    },
                    {
                      name: "id_nivel_tristeza_desesperanza",
                      label: "¿Ha sentido alguna vez tristeza profunda, desesperanza o falta de motivación?",
                      options: opciones.escala_likert_intensidad
                    },
                    {
                      name: "id_nivel_problemas_sueno",
                      label: "¿Ha tenido problemas para conciliar el sueño, mantenerse dormido(a) o ha dormido en exceso?",
                      options: opciones.escala_likert_intensidad
                    },
                    {
                      name: "id_nivel_disminucion_energia",
                      label: "¿Ha notado una disminución en sus niveles de energía o se siente fatigado(a)?",
                      options: opciones.escala_likert_intensidad
                    },
                    {
                      name: "id_nivel_cambio_apetito",
                      label: "¿Notas que tu apetito ha cambiado?",
                      options: opciones.escala_likert_intensidad
                    },
                    {
                      name: "id_nivel_decepcion_personal",
                      label: "¿Te has sentido decepcionado contigo mismo, o crees que has fallado a tus seres queridos?",
                      options: opciones.escala_likert_intensidad
                    },
                    {
                      name: "id_nivel_problemas_concentracion",
                      label: "¿Tienes problemas para mantener la concentración en tareas como leer o ver la tele?",
                      options: opciones.escala_likert_intensidad
                    },
                    {
                      name: "id_nivel_movimientos_involuntarios",
                      label: "¿Experimentas movimientos involuntarios, como temblores musculares o tics?",
                      options: opciones.escala_likert_intensidad
                    },
                    {
                      name: "id_nivel_tentacion_no_levantarse",
                      label: "¿Te resulta tentador no levantarte por la mañana?",
                      options: opciones.escala_likert_intensidad
                    }
                  ].map((question, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{question.label}</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {question.options.map(opcion => (
                          <label key={opcion.id} className="flex items-center p-2 bg-white border rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors">
                            <input
                              type="radio"
                              name={question.name}
                              value={opcion.id}
                              checked={parseInt(formData[question.name]) === opcion.id}
                              onChange={handleInputChange}
                              className="sr-only"
                              required
                            />
                            <span className={`w-full text-center py-2 rounded ${parseInt(formData[question.name]) === opcion.id ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-700'}`}>
                              {opcion.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sección 4: Ambiente Laboral */}
            {activeSection === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-indigo-800 flex items-center">
                  <span className="bg-indigo-100 p-2 rounded-lg mr-3">🏢</span>
                  Ambiente Laboral
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      name: "id_frecuencia_limitacion_convivencia",
                      label: "¿Alguno de sus compañeros de trabajo le han pedido que se limite solo a trabajar y no conviva con sus compañeros?",
                      options: opciones.escala_likert_frecuencia
                    },
                    {
                      name: "id_frecuencia_desacreditar_profesionalismo",
                      label: "¿Alguno de sus compañeros de trabajo ha desacreditado su profesionalismo o su capacidad laboral?",
                      options: opciones.escala_likert_frecuencia
                    },
                    {
                      name: "id_frecuencia_desprestigio",
                      label: "¿Alguno de sus compañeros la ha desprestigiado?",
                      options: opciones.escala_likert_frecuencia
                    },
                    {
                      name: "id_frecuencia_informar_mal_permanencia",
                      label: "¿Informan mal sobre su permanencia y dedicación hacia su trabajo?",
                      options: opciones.escala_likert_frecuencia
                    }
                  ].map((question, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{question.label}</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {question.options.map(opcion => (
                          <label key={opcion.id} className="flex items-center p-2 bg-white border rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors">
                            <input
                              type="radio"
                              name={question.name}
                              value={opcion.id}
                              checked={parseInt(formData[question.name]) === opcion.id}
                              onChange={handleInputChange}
                              className="sr-only"
                              required
                            />
                            <span className={`w-full text-center py-2 rounded ${parseInt(formData[question.name]) === opcion.id ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-700'}`}>
                              {opcion.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sección 5: Información Personal y Familiar */}
            {activeSection === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-indigo-800 flex items-center">
                  <span className="bg-indigo-100 p-2 rounded-lg mr-3">👪</span>
                  Información Personal y Familiar
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de estudios</label>
                    <select
                      name="id_nivel_estudios"
                      value={formData.id_nivel_estudios}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {opciones.nivel_estudios.map(opcion => (
                        <option key={opcion.id} value={opcion.id}>{opcion.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lugar de nacimiento</label>
                    <select
                      name="id_estado_nacimiento"
                      value={formData.id_estado_nacimiento}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {estadosMexico.map(opcion => (
                        <option key={opcion.id} value={opcion.id}>{opcion.label}</option>
                      ))}
                    </select>    
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lugar donde ha vivido más años</label>
                    <select
                      name="id_estado_mas_anos"
                      value={formData.id_estado_mas_anos}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {estadosMexico.map(opcion => (
                        <option key={opcion.id} value={opcion.id}>{opcion.label}</option>
                      ))}
                    </select>   
                  </div>

                  {/* Nuevo campo para municipio */}
                  {formData.id_estado_mas_anos && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Municipio donde ha vivido más años</label>
                    {loadingMunicipios ? (
                      <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Cargando municipios...
                      </div>
                    ) : (
                      <select
                        name="id_municipio"
                        value={formData.id_municipio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        required
                      >
                        <option value="">Seleccionar municipio...</option>
                        {municipiosMexico.map(opcion => (
                          <option key={opcion.id} value={opcion.id}>{opcion.label}</option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado civil de sus padres</label>
                    <select
                      name="id_estado_civil_padres"
                      value={formData.id_estado_civil_padres}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {opciones.estado_civil_padres.map(opcion => (
                        <option key={opcion.id} value={opcion.id}>{opcion.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Sección 6: Antecedentes Familiares de Salud */}
            {activeSection === 5 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-indigo-800 flex items-center">
                  <span className="bg-indigo-100 p-2 rounded-lg mr-3">🧬</span>
                  Antecedentes Familiares de Salud
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "id_familiares_diabetes",
                      label: "¿Alguno de sus familiares cercanos ha tenido diabetes?",
                      options: opciones.respuestas_si_no
                    },
                    {
                      name: "id_familiares_cancer",
                      label: "¿Alguno de sus familiares cercanos ha tenido cáncer?",
                      options: opciones.respuestas_si_no
                    },
                    {
                      name: "id_familiares_cerebrovascular",
                      label: "¿Alguno de sus familiares cercanos ha tenido enfermedades cerebro vasculares?",
                      options: opciones.respuestas_si_no
                    }
                  ].map((question, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{question.label}</label>
                      <div className="space-y-2">
                        {question.options.map(opcion => (
                          <label key={opcion.id} className="flex items-center p-2 bg-white border rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors">
                            <input
                              type="radio"
                              name={question.name}
                              value={opcion.id}
                              checked={parseInt(formData[question.name]) === opcion.id}
                              onChange={handleInputChange}
                              className="mr-2 text-indigo-600 focus:ring-indigo-500"
                              required
                            />
                            {opcion.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sección 7: Revisión */}
            {activeSection === 6 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-indigo-800 flex items-center">
                  <span className="bg-indigo-100 p-2 rounded-lg mr-3">📋</span>
                  Revisión de Respuestas
                </h3>
                
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <p className="text-indigo-800 mb-4">Por favor, revisa tus respuestas antes de enviar el formulario. Una vez enviado, no podrás modificarlo.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Nombres:</strong> {formData.nombres}</div>
                    <div><strong>Apellidos:</strong> {formData.apellidos}</div>
                    <div><strong>Edad:</strong> {formData.edad}</div>
                    <div><strong>Género:</strong> {opciones.genero.find(g => g.id === parseInt(formData.id_genero))?.label || 'No especificado'}</div>
                    <div><strong>Rol en la organización:</strong> {rolesOrganizacion.find(r => r.id === parseInt(formData.id_rol_organizacion))?.label || 'No especificado'}</div>
                    <div><strong>Años en la organización:</strong> {formData.anos_organizacion}</div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Importante</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Al enviar este formulario, confirmas que la información proporcionada es verídica y das tu consentimiento para el uso de estos datos con fines de investigación.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {renderNavigation()}
          </form>
        </div>
        <div className="bg-gray-100 text-center py-4 text-sm text-gray-600">
          Desarrollado por <a href="https://dlimon.net" target="_blank">Daniel Limón</a> en colaboración con <a href="https://acercandote.org" target="_blank">Acercandote.org</a>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;