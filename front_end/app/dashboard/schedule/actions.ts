'use server';

import { MaintenanceSchedule } from "./types/schedule-types";
import { Equipment } from "./types/equipment-types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Simula conexão com um banco de dados
 */
const db = {
  schedules: [] as MaintenanceSchedule[],
  equipment: [] as Equipment[],
};

/**
 * Server Action para criar um novo agendamento
 */
export async function createSchedule(scheduleData: Omit<MaintenanceSchedule, 'id'>) {
  // Validação dos dados
  if (!scheduleData.equipmentId || !scheduleData.date || !scheduleData.technician) {
    throw new Error('Dados obrigatórios não fornecidos');
  }

  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 500));

  const newSchedule: MaintenanceSchedule = {
    ...scheduleData,
    id: `SCH-${Math.random().toString(36).substring(2, 9)}`,
    status: 'Scheduled' as const,
  };

  // Em produção, aqui seria uma chamada à API ou banco de dados
  db.schedules.push(newSchedule);

  // Revalida o cache da página
  revalidatePath('/maintenance-schedule');

  return {
    success: true,
    schedule: newSchedule,
    message: 'Agendamento criado com sucesso!'
  };
}

/**
 * Server Action para atualizar um agendamento existente
 */
export async function updateSchedule(scheduleId: string, updatedData: Partial<MaintenanceSchedule>) {
  // Validação
  if (!scheduleId) {
    throw new Error('ID do agendamento não fornecido');
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  // Simula atualização no banco de dados
  const index = db.schedules.findIndex(s => s.id === scheduleId);
  
  if (index === -1) {
    throw new Error('Agendamento não encontrado');
  }

  const updatedSchedule = {
    ...db.schedules[index],
    ...updatedData,
    id: scheduleId // Garante que o ID não seja alterado
  };

  db.schedules[index] = updatedSchedule;

  revalidatePath('/maintenance-schedule');

  return {
    success: true,
    schedule: updatedSchedule,
    message: 'Agendamento atualizado com sucesso!'
  };
}

/**
 * Server Action para excluir um agendamento
 */
export async function deleteSchedule(scheduleId: string) {
  if (!scheduleId) {
    throw new Error('ID do agendamento não fornecido');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  // Simula exclusão no banco de dados
  const initialLength = db.schedules.length;
  db.schedules = db.schedules.filter(s => s.id !== scheduleId);

  if (db.schedules.length === initialLength) {
    throw new Error('Agendamento não encontrado para exclusão');
  }

  revalidatePath('/maintenance-schedule');

  return {
    success: true,
    message: 'Agendamento excluído com sucesso!'
  };
}

/**
 * Server Action para marcar agendamento como concluído
 */
export async function completeSchedule(scheduleId: string) {
  if (!scheduleId) {
    throw new Error('ID do agendamento não fornecido');
  }

  await new Promise(resolve => setTimeout(resolve, 300));

  const index = db.schedules.findIndex(s => s.id === scheduleId);
  
  if (index === -1) {
    throw new Error('Agendamento não encontrado');
  }

  const completedSchedule = {
    ...db.schedules[index],
    status: 'Completed' as const,
    completedAt: new Date().toISOString()
  };

  db.schedules[index] = completedSchedule;

  revalidatePath('/maintenance-schedule');

  return {
    success: true,
    schedule: completedSchedule,
    message: 'Manutenção marcada como concluída!'
  };
}

/**
 * Server Action para buscar equipamentos
 */
export async function getEquipmentList() {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Em produção, isso viria de um banco de dados
  return {
    success: true,
    equipment: db.equipment,
    message: 'Lista de equipamentos carregada'
  };
}

/**
 * Server Action para buscar agendamentos
 */
export async function getSchedules() {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    success: true,
    schedules: db.schedules,
    message: 'Lista de agendamentos carregada'
  };
}

/**
 * Função auxiliar para inicializar dados mockados (usar apenas em desenvolvimento)
 */
export async function initializeMockData() {
  if (process.env.NODE_ENV !== 'development') return;
  
  const { equipmentData } = await import('./data/mock-equipment');
  const { scheduleData } = await import('./data/mock-schedules');
  
  db.equipment = [...equipmentData];
  db.schedules = [...scheduleData];
  
  return {
    success: true,
    message: 'Dados mockados inicializados'
  };
}