
import {resolve} from 'path';
import { User } from '../types/users';
import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator";
import { v4 as uuidv4 } from 'uuid';
import asyncFs from 'fs/promises';

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '../../', dir)
}

const firstNames = [
  'Александр',
  'Алексей',
  'Анатолий',
  'Андрей',
  'Антон',
  'Аркадий',
  'Арсений',
  'Артём',
  'Борис',
  'Вадим',
  'Валентин',
  'Василий',
  'Виктор',
  'Виталий',
  'Владимир',
  'Владислав',
  'Вячеслав',
  'Георгий',
  'Глеб',
  'Григорий'
];

const middleNames = [
  'Александрович',
  'Алексеевич',
  'Анатольевич',
  'Андреевич',
  'Антонович',
  'Аркадьевич',
  'Арсеньевич',
  'Артёмович',
  'Борисович',
  'Вадимович',
  'Валентинович',
  'Васильевич',
  'Викторович',
  'Витальевич',
  'Владимирович',
  'Владиславович',
  'Вячеславович',
  'Георгиевич',
  'Глебович',
  'Григорьевич'
];

const lastNames = [
  'Иванов',
  'Смирнов',
  'Кузнецов',
  'Попов',
  'Соколов',
  'Лебедев',
  'Козлов',
  'Новиков',
  'Морозов',
  'Петров',
  'Волков',
  'Соловьев',
  'Васильев',
  'Зайцев',
  'Павлов',
  'Семенов',
  'Голубев',
  'Виноградов',
  'Богданов',
  'Воробьев'
];

const departments = [
  'Отдел разработки',
  'Отдел маркетинга',
  'Отдел продаж',
  'Отдел качества',
  'Отдел финансов',
  'Отдел управления персоналом',
  'Отдел информационных технологий',
  'Отдел снабжения',
  'Отдел исследований и развития',
  'Отдел клиентского обслуживания',
  ''
];

const companies = [
  'Аврора Технологии',
  'Сибирский Газпром',
  'Золотая Россия',
  'Уральские Металлурги',
  'Волжский Автопром',
  ''
]

const positions = [
  'Менеджер',
  'Стажер',
  'Директор департамента',
  'Секретарь',
  'Водитель',
  'Бухгалтер',
  ''
]

const usersPath = pathResolve('./nobd/user.json');

console.warn('Users JSON Path is ::', usersPath)

export function createUser(user: Partial<User>): User {
  return {
    id: user.id || uuidv4(),
    state: user.state || Math.floor(Math.random() * 2),
    company: user.company || companies[Math.floor(Math.random() * 6)],
    department: user.department || departments[Math.floor(Math.random() * 11)],
    avatar: user.avatar || `data:image/svg+xml;base64,${btoa(getRandomAvatar())}`,
    firstName: user.firstName || firstNames[Math.floor(Math.random() * 20)],
    lastName: user.lastName || lastNames[Math.floor(Math.random() * 20)],
    middleName: user.middleName || middleNames[Math.floor(Math.random() * 20)],
    position: user.position || positions[Math.floor(Math.random() * 7)],
  }
}

export async function write(data: User[]) {
  const json = JSON.stringify(data, null, 2)

  try {
    await asyncFs.writeFile(usersPath, json);
    console.log('Файл успешно записан.');
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // Если файл не существует, создаем новый
      await asyncFs.writeFile(usersPath, json);
      console.log(`Новый файл создан: ${usersPath}`);
    } else {
      // Обработка других ошибок записи файла
      console.error('Ошибка при записи файла:', err);
    }
  }
}

export async function read() {
  try {
    const data = await asyncFs.readFile(usersPath, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (error) {
    console.error('Произошла ошибка при чтении файла:', error);
  }
}

export async function CreateUsers(count: number) {
  const list = (new Array(count)).fill('').map(() => createUser({}));

  try {
    await write(list);
    return list;
  } catch (err) {
    null;
  }
}