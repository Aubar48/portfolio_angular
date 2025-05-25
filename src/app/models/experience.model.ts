export interface Experience {
  id?: number;
  puesto: string;
  empresa: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin?: string;
  foto?: string;
  UsuarioId?: number;
}