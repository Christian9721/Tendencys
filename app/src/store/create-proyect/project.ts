import { createSlice, PayloadAction, current, createAsyncThunk } from '@reduxjs/toolkit';
import { defaultValueUser } from '../../interfaces/user.interface';
import {
	//IUnidadFuncional,
	TFuncionales,
	//TEspaciosFuncionales,
	TActividadesProp,
	TActividades,
	IActividad,
	IFuncional,
	TIndicadores,
	//TFrecuencia,
	IIndicador,
	IProyecto,
	IRol,
	IPersonal,
	TEquipos,
} from '../../interfaces/logic.interface';
import { TCriteriosTable, ITable } from '../../interfaces/criterios.interface';
//TEST INITIAL STATE
//import { defaultProject } from '../../adapters/nuevo-proyecto';
import { TFrecuenciaServices } from '../../pages/cronograma/adapters/data.adapters';
import { TTeams, ITeam } from '../../interfaces/personal.interface';
import { TRolTable } from '../../pages/personal/constants/data.constants';
import { IVerticalStepperAttributes } from '../../interfaces/vertical.steper.attributes.interface';
import { uniqueId } from '../../utils/uniqueId';

//const defaultUnidadFuncional: TFuncionales = [];
const defaultProyect: IProyecto = {
	id: '',
	name: '',
	shortName: '',
	contractNumber: '',
	location: '',
	contractStartDate: '',
	contractEndDate: '',
	supervisionStartDate: '',
	description: '',
	coverImage: {
		path: '',
	},
	document: [],
	functionalUnits: [],
	activities: [],
	generalCriteria: [],
	findings: [],
	frecuencies: [],
	nonWorkingDays: {
		days: [],
		specificDays: [],
	},
	personal: {
		teams: [],
		roles: [],
		users: [],
	},
	step: '0',
};

export const fetchAddUnidad = createAsyncThunk(
	'unidadFuncional/updateAddWithFetch',
	async (newUnit: TFuncionales, { dispatch, getState }) => {
		await dispatch(addUnidad(newUnit));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchUpdateUnidad = createAsyncThunk(
	'unidadFuncional/updateUnidadWithFetch',
	async (newUnit: TCriteriosTable[], { dispatch, getState }) => {
		await dispatch(updateUnidad({ data: newUnit }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchSetActivities = createAsyncThunk(
	'unidadFuncional/setActivitiesWithFetch',
	async (newUnit: TCriteriosTable, { dispatch, getState }) => {
		await dispatch(setActivities(newUnit));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchSetCriteriosGenerales = createAsyncThunk(
	'unidadFuncional/fetchSetCriteriosGeneralesWithFetch',
	async (newUnit: TCriteriosTable, { dispatch, getState }) => {
		await dispatch(setIndicadoresGeneral(newUnit));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);
interface IAddIndicadoresGeneralesProps {
	ids_ig: Array<Set<number | string>>;
	indicadores: TIndicadores;
}
export const fetchAddIndicadoresGenerales = createAsyncThunk(
	'unidadFuncional/fetchAddIndicadoresGeneralesWithFetch',
	async (
		{ ids_ig, indicadores }: IAddIndicadoresGeneralesProps,
		{ dispatch, getState }
	) => {
		await dispatch(addIndicadoresGenerales({ ids_ig, indicadores }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchUpdateRelacionActividadCriterioEspacio = createAsyncThunk(
	'unidadFuncional/fetchAddIndicadoresGeneralesWithFetch',
	async (data: Set<string>, { dispatch, getState }) => {
		await dispatch(updateRelacionActividadCriterioEspacio({ data }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchAddIndicadoresEspecificos = createAsyncThunk(
	'unidadFuncional/fetchAddIndicadoresEspecificosWithFetch',
	async (newUnit: TCriteriosTable[], { dispatch, getState }) => {
		await dispatch(addIndicadoresEspecificos({ data: newUnit }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

interface IFetchRelacionProps {
	lvl1: Set<string>;
	lvl2: Set<string>;
	activities: TActividades;
}
export const fetchRelacionEspacios = createAsyncThunk(
	'unidadFuncional/fetchRelacionEspaciosWithFetch',
	async ({ lvl1, lvl2, activities }: IFetchRelacionProps, { dispatch, getState }) => {
		await dispatch(updateRelacionUnidadEspacios({ lvl1, lvl2, activities }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchAddUserRole = createAsyncThunk(
	'unidadFuncional/fetchAddUserRoleWithFetch',
	async (data: TRolTable, { dispatch, getState }) => {
		await dispatch(addUsersToRoles({ data }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchAddTeams = createAsyncThunk(
	'unidadFuncional/fetchAddTeamsWithFetch',
	async (data: TTeams, { dispatch, getState }) => {
		await dispatch(addTeams({ data }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchUpdateSupervisor = createAsyncThunk(
	'unidadFuncional/fetchUpdateSupervisorWithFetch',
	async (data: TCriteriosTable, { dispatch, getState }) => {
		await dispatch(updateSupervisor({ data }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchAddFrecuency = createAsyncThunk(
	'unidadFuncional/fetchAddFrecuencyWithFetch',
	async (data: TFrecuenciaServices, { dispatch, getState }) => {
		await dispatch(addFrequency({ freq: data }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchUpdateFrecuenciaUnidadActividad = createAsyncThunk(
	'unidadFuncional/fetchUpdateFrecuenciaUnidadActividadWithFetch',
	async (data: TFrecuenciaServices[], { dispatch, getState }) => {
		await dispatch(updateFrecuenciaUnidadActividad({ data }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchUpdateFrecuenciaUnidadEspacioActividad = createAsyncThunk(
	'unidadFuncional/fetchUpdateFrecuenciaUnidadEspacioActividadWithFetch',
	async (data: { [key: string]: string }, { dispatch, getState }) => {
		await dispatch(updateFrecuenciaUnidadEspacioActividad({ data }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchSetFindings = createAsyncThunk(
	'unidadFuncional/setFetchFindings',
	async (data: TCriteriosTable, { dispatch, getState }) => {
		await dispatch(updateFindings({ data }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchCreateFrecuencies = createAsyncThunk(
	'unidadFuncional/createFrecuencies',
	async (data: ITable[], { dispatch, getState }) => {
		await dispatch(createFrecuencies(data));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

interface IFetchNonWorkingProps {
	days: ITable[];
	selected: Set<number | string>;
}
export const fetchCreateNonWorkingDays = createAsyncThunk(
	'unidadFuncional/createNonWorkingDays',
	async ({ days, selected }: IFetchNonWorkingProps, { dispatch, getState }) => {
		await dispatch(createNonWorkingDays({ days, selected }));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const fetchSetSupervisionStartDate = createAsyncThunk(
	'unidadFuncional/setSupervisionStartDate',
	async (date: string, { dispatch, getState }) => {
		await dispatch(setSupervisionStartDate(date));
		const updatedState = getState() as IProyecto;
		return updatedState;
	}
);

export const project = createSlice({
	name: 'unidadFuncional',
	initialState: defaultProyect,
	//initialState: defaultProject,
	reducers: {
		updateGeneralInfo: (state, action): IProyecto => ({
			...state,
			...action.payload,
		}),
		updateUnidad: (
			state,
			action: PayloadAction<{
				data: TCriteriosTable[];
			}>
		): IProyecto => {
			const { data } = action.payload;
			return {
				...state,
				functionalUnits: state.functionalUnits.map((i, idx) => {
					return {
						...i,
						sublevels: [
							...i.sublevels,
							...data[idx].map(
								(nivel, ndx): IFuncional => ({
									id: `${i.id}_${ndx}`,
									name: nivel.label,
									sublevels: [],
									activities: [],
									mainAttribute: nivel.rows[0].key,
									attributes: nivel.rows,
								})
							),
						],
					};
				}),
			};
		},
		addUnidad: (state, action: PayloadAction<TFuncionales>): IProyecto => {
			return {
				...state,
				functionalUnits: /*[...state.functionalUnits, ...*/ action.payload, //],,
			};
		},
		updateRelacionUnidadEspacios: (
			state,
			action: PayloadAction<{
				lvl1: Set<string>;
				lvl2: Set<string>;
				activities: TActividades;
			}>
		): IProyecto => {
			const { lvl1, lvl2, activities } = action.payload;
			const _N1_list = Array.from(lvl1) as string[];
			const _N2_list = Array.from(lvl2) as string[];
			//Asignacion de Servicios a Nivel 1
			const copy = state.functionalUnits.map((unidadFuncional, idx) => ({
				...unidadFuncional,
				activities: [
					..._N1_list
						.map((el, idy) => {
							const [service, nivel] = el.split('+'); //"S-0+N1-0" -> [S-0,N1-0]
							const [_1, indexLvl] = nivel.split('-'); //"N1-0" -> [N1, 0]
							const [_2, indexService] = service.split('-'); //"S-0" -> [S, 0]

							if (idx === Number(indexLvl)) {
								return {
									...activities[Number(indexService)],
								};
							}
						})
						.filter((i): i is IActividad => typeof i !== 'undefined'),
				],
			}));

			//Asignacion de Servicios a Nivel 2
			const copy2: TFuncionales = copy.map((unidadFuncional, idx) => ({
				...unidadFuncional,
				sublevels: [
					...unidadFuncional.sublevels.map((sublevel, idy) => ({
						...sublevel,
						activities: [
							..._N2_list
								.map((el, _) => {
									const [service, nivel, sublevel] = el.split('+'); //"S-0+N1-1+N1-1_0" -> [S-0,N1-1,N1-1_0]
									const [_1, indexLvl] = nivel.split('-'); //"N1-1" -> [N1, 1]
									const [_2, indexService] = service.split('-'); //"S-0" -> [S, 0]
									const [_3, indexLv2] = sublevel.split('_'); //"N1-1_0" -> [N1-1, 0]

									if (
										idx === Number(indexLvl) &&
										idy === Number(indexLv2)
									) {
										return {
											...activities[Number(indexService)],
										};
									}
								})
								.filter((i): i is IActividad => typeof i !== 'undefined'),
						],
					})),
				],
			}));
			return {
				...state,
				functionalUnits: copy2,
			};
		},
		updateRelacionActividadCriterioEspacio: (
			state,
			action: PayloadAction<{ data: Set<string> }>
		): IProyecto => {
			const { data } = action.payload;
			const unchecked = Array.from(data);

			return {
				...state,
				functionalUnits: state.functionalUnits.map((UF) => ({
					...UF,
					sublevels: UF.sublevels.map((EF) => ({
						...EF,
						activities: EF.activities.map((ACT) => {
							return {
								...ACT,
								generalIndicators: ACT.generalIndicators.filter((IG) => {
									const _mapped = unchecked.map((i) => {
										const [N1, N2, S, I] = i.split('+'); //[N1-0+N1-0_0+S-0+IG-0] -> [N1-0,N1-0_0,S-0,IG-0]
										const condition =
											UF.id === N1 &&
											EF.id === N2 &&
											ACT.id === S &&
											IG.id === I;
										return condition ? I : '-';
									});
									return !_mapped.includes(IG.id);
								}),
								specificIndicators: {
									id: ACT?.specificIndicators?.id || '',
									specificIndicators: ACT.specificIndicators
										? ACT.specificIndicators.specificIndicators.map(
												(IE) => {
													const _mapped = unchecked.map((i) => {
														const [N1, N2, S, I] =
															i.split('+'); //[N1-0+N1-0_0+S-0+IG-0] -> [N1-0,N1-0_0,S-0,IE-0]
														const condition =
															UF.id === N1 &&
															EF.id === N2 &&
															ACT.id === S &&
															IE.id === I;
														return condition ? I : '-';
													});
													return {
														...IE,
														applies: !_mapped.includes(IE.id),
													};
												}
										  )
										: [],
								},
							};
						}),
					})),
				})),
			};
		},
		updateFrecuenciaUnidadActividad: (
			state,
			action: PayloadAction<{ data: TFrecuenciaServices[] }>
		): IProyecto => {
			const { data } = action.payload;
			return {
				...state,
				functionalUnits: state.functionalUnits.map((item, idx) => ({
					...item,
					activities: item.activities.map((actividad, idy) => ({
						...actividad,
						frequency: data[idx][idy].frecuencia,
					})),
				})),
			};
		},
		updateFindings: (
			state,
			action: PayloadAction<{ data: TCriteriosTable }>
		): IProyecto => {
			const { data } = action.payload;
			return {
				...state,
				findings: data.map((i, idx) => ({
					id: `H-${idx}`,
					name: i.label,
				})),
			};
		},
		updateFrecuenciaUnidadEspacioActividad: (
			state,
			action: PayloadAction<{ data: { [key: string]: string } }>
		): IProyecto => {
			const { data } = action.payload;
			const keys = Object.entries(data);
			return {
				...state,
				functionalUnits: state.functionalUnits.map((UF) => ({
					...UF,
					sublevels: UF.sublevels.map((EF) => ({
						...EF,
						activities: EF.activities.map((ACT) => ({
							...ACT,
							generalIndicators: ACT.generalIndicators
								.map((IG) => {
									const _mapped: Array<{
										key: string;
										value: string;
									} | null> = keys.map((key) => {
										const [N1, N2, S, I] = key[0].split('+'); //[N1-0+N1-0_0+S-0+IG-0] -> [N1-0,N1-0_0,S-0,IG-0]
										const condition =
											UF.id === N1 &&
											EF.id === N2 &&
											ACT.id === S &&
											IG.id === I;
										if (condition) {
											return { key: I, value: key[1] };
										}
										return null;
									});
									const element =
										_mapped.filter((i) => i?.key === IG.id)[0] ||
										null;
									if (element) {
										return {
											...IG,
											frequency: element.value,
										};
									}
									return { ...IG };
								})
								.filter((i): i is IIndicador => typeof i !== 'undefined'),
							specificIndicators: {
								id: ACT?.specificIndicators?.id || '',
								specificIndicators: ACT.specificIndicators
									? ACT.specificIndicators.specificIndicators
											.map((IE) => {
												const _mapped: Array<{
													key: string;
													value: string;
												} | null> = keys.map((key) => {
													const [N1, N2, S, I] =
														key[0].split('+'); //[N1-0+N1-0_0+S-0+IG-0] -> [N1-0,N1-0_0,S-0,IG-0]
													const condition =
														UF.id === N1 &&
														EF.id === N2 &&
														ACT.id === S &&
														IE.id === I;
													if (condition) {
														return { key: I, value: key[1] };
													}
													return null;
												});
												const element =
													_mapped.filter(
														(i) => i?.key === IE.id
													)[0] || null;
												if (element) {
													return {
														...IE,
														frequency: element.value,
													};
												}
												return { ...IE };
											})
											.filter(
												(i): i is IIndicador =>
													typeof i !== 'undefined'
											)
									: [],
							},
						})),
					})),
				})),
			};
		},
		//ACTIVIDADES
		setActivities: (state, action: PayloadAction<TCriteriosTable>): IProyecto => {
			const copy: TActividades = action.payload.map((i, idx) => ({
				id: `S-${idx}`,
				name: i.label,
				generalIndicators: [],
				mainAttribute: i.rows[0].key,
				attributes: i.rows,
			}));
			return {
				...state,
				activities: [...copy],
			};
		},
		addIndicadoresGenerales: (
			state,
			action: PayloadAction<{
				ids_ig: Array<Set<number | string>>;
				indicadores: TIndicadores;
			}>
		): IProyecto => {
			const { ids_ig, indicadores } = action.payload;
			return {
				...state,
				activities: state.activities.map((obj, inx) => {
					const _igs = Array.from(ids_ig[inx]) as string[];
					return {
						...obj,
						generalIndicators: [
							...obj.generalIndicators,
							..._igs.map((i) => {
								const [_, ig_index] = i.split('-');
								return indicadores[Number(ig_index)];
							}),
						],
					};
				}),
			};
		},
		addIndicadoresEspecificos: (
			state,
			action: PayloadAction<{ data: TCriteriosTable[] }>
		): IProyecto => {
			const { data } = action.payload;
			return {
				...state,
				activities: state.activities.map((obj, idx) => {
					return {
						...obj,
						specificIndicators: {
							id: `${obj.id}_IE-${idx}`,
							specificIndicators: data[idx].map((el, idy) => ({
								id: `IE-${idy}`,
								name: el.label,
								mainAttribute: el.rows[0].key,
								attributes: el.rows,
								applies: true,
							})),
						},
					};
				}),
			};
		},
		updateSupervisor: (
			state,
			action: PayloadAction<{ data: TCriteriosTable }>
		): IProyecto => {
			const { data } = action.payload;
			return {
				...state,
				activities: state.activities.map((i, idx) => ({
					...i,
					supervisor: data[idx].rows[0].value,
					substitute1: data[idx].rows[1].value,
					substitute2: data[idx].rows[2].value,
				})),
			};
		},
		addFrequency: (
			state,
			action: PayloadAction<{ freq: TFrecuenciaServices }>
		): IProyecto => {
			const { freq } = action.payload;
			return {
				...state,
				activities: state.activities.map((obj, idx) => {
					return { ...obj, frequency: freq[idx].frecuencia };
				}),
			};
		},
		//CREATE FREQUENCIES
		createFrecuencies: (state, action: PayloadAction<ITable[]>) => {
			return {
				...state,
				frecuencies: action.payload.map((i) => ({
					id: `FR-${uniqueId(9)}`,
					name: i.rows[0].value,
					attributes: i.rows,
				})),
			};
		},
		createNonWorkingDays: (
			state,
			action: PayloadAction<{ days: ITable[]; selected: Set<string | number> }>
		) => {
			const { days, selected } = action.payload;
			return {
				...state,
				nonWorkingDays: {
					days: Array.from(selected),
					specificDays: days.map((i) => ({
						day: i.rows[0].value,
						month: i.rows[1].value,
					})),
				},
			};
		},
		setSupervisionStartDate: (state, action: PayloadAction<string>) => {
			return {
				...state,
				supervisionStartDate: action.payload,
			};
		},
		//CRITERIOS GENERALES
		setIndicadoresGeneral: (
			state,
			action: PayloadAction<TCriteriosTable>
		): IProyecto => {
			const copy: TIndicadores = action.payload.map((i, idx) => ({
				id: `IG-${idx}`,
				name: i.label,
				//ig: [],
				mainAttribute: i.rows[0].key,
				attributes: i.rows,
				applies: true,
				frequency: '',
			}));
			return {
				...state,
				generalCriteria: [...copy],
			};
		},
		//PERSONAL
		addRole: (state, action: PayloadAction<{ data: TCriteriosTable }>): IProyecto => {
			//console.log('roles: ', action.payload);
			const { data } = action.payload;
			const _newRol: IRol = {
				id: `R-${state.personal.roles.length}`,
				name: data[0].label,
				attributes: data[0].rows.map((i) => ({
					key: i.key,
					value: '',
				})),
			};
			return {
				...state,
				personal: {
					...state.personal,
					roles: [...state.personal.roles, _newRol],
				},
			};
		},
		addTeams: (state, action: PayloadAction<{ data: TTeams }>): IProyecto => {
			const { data } = action.payload;

			const copy: TEquipos = data.map((team, idx) => ({
				id: `EQ-${idx}`,
				name: team.label,
				users: team.members.map((member, idy) => ({
					id: `M-${idx}_${idy}`,
					name: member.value,
					attributes: [],
				})),
			}));

			return {
				...state,
				personal: {
					...state.personal,
					teams: copy,
				},
			};
		},
		addUsersToRoles: (
			state,
			action: PayloadAction<{ data: TRolTable }>
		): IProyecto => {
			const { data } = action.payload;
			//console.log('updated: ', data);
			return {
				...state,
				personal: {
					...state.personal,
					roles: state.personal.roles.map((i) => {
						if (i.name === data[0].label) {
							return {
								...i,
								users: [
									...(i.users || []),
									...data.map((user) => ({
										id: String(user.id),
										name: user.rows[0].value,
										active: Boolean(user.isActive),
										attributes: user.rows,
									})),
								],
							};
						}
						return { ...i };
					}),
				},
			};
		},
		updateRoles: (state, action: PayloadAction<{ data: ITable[] }>): IProyecto => {
			const { data } = action.payload;
			return state;
		},
		editRoles: (
			state,
			action: PayloadAction<{ data: IVerticalStepperAttributes[] }>
		): IProyecto => {
			const { data } = action.payload;

			let addedData: IVerticalStepperAttributes[] = [];

			if (data.length > state.personal.roles.length) {
				const spliceindex = state.personal.roles.length;
				addedData = data.slice(spliceindex, data.length);
			}

			return {
				...state,
				personal: {
					...state.personal,
					roles: [
						...state.personal.roles.map((i, idx) => ({
							...i,
							name: data[idx].value,
						})),
						...addedData.map((i) => ({
							id: String(i.key),
							name: i.value,
							attributes: [],
						})),
					],
				},
			};
		},
	},
});

export const {
	//GENERAL INFO PROJECT
	updateGeneralInfo,
	//UNIDADES
	updateUnidad,
	addUnidad,
	updateRelacionUnidadEspacios,
	updateFrecuenciaUnidadActividad,
	updateFrecuenciaUnidadEspacioActividad,
	updateRelacionActividadCriterioEspacio,
	//CREATE_FREQUENCIES
	createFrecuencies,
	createNonWorkingDays,
	setSupervisionStartDate,
	//ACTIVIDADES
	setActivities,
	addIndicadoresGenerales,
	addIndicadoresEspecificos,
	addFrequency,
	updateSupervisor,
	//CRITERIOS GENERALES
	setIndicadoresGeneral,
	updateFindings,
	//PERSONAL
	addRole,
	addTeams,
	addUsersToRoles,
	updateRoles,
	editRoles,
} = project.actions;

export default project.reducer;
