// Список врачей в системе
export const doctors = [
  {
    id: 1,
    name: "Иванов Иван Иванович",
    specialty: "Терапевт",
    specialtyCode: "therapist"
  },
  {
    id: 2,
    name: "Кустов Кирилл Денисович",
    specialty: "Лор",
    specialtyCode: "lor"
  },
  {
    id: 3,
    name: "Сарапулов Игорь Александрович",
    specialty: "Дерматолог",
    specialtyCode: "dermatologist"
  }
];

// Функция для получения врача по ID
export const getDoctorById = (id) => {
  return doctors.find(doctor => doctor.id === id);
};

// Функция для получения всех врачей
export const getAllDoctors = () => {
  return doctors;
};

