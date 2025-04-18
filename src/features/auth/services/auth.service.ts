import { api } from '@/shared/api'

import type { TypeLoginSchema, TypeRegisterSchema } from '../schemes'
import type { IAuthResponse } from '../types'

/**
 * Сервис для работы с аутентификацией.
 */
class AuthService {
	/**
	 * Регистрация нового пользователя.
	 *
	 * @param {TypeRegisterSchema} body - Данные для регистрации.
	 * @returns {Promise<IAuthResponse>} - Ответ с данными пользователя.
	 */
	public async register(body: TypeRegisterSchema) {
		const response = await api.post<IAuthResponse>('auth/register', body)

		return response
	}

	/**
	 * Вход пользователя в систему.
	 *
	 * @param {TypeLoginSchema} body - Данные для входа.
	 * @returns {Promise<IAuthResponse>} - Ответ с данными пользователя.
	 */
	public async login(body: TypeLoginSchema) {
		const response = await api.post<IAuthResponse>('auth/login', body)

		return response
	}

	/**
	 * Аутентификация через провайдера.
	 *
	 * @param {'google' | 'yandex'} provider - Провайдер для аутентификации.
	 * @returns {Promise<{ url: string }>} - URL для аутентификации.
	 */
	public async oauthByProvider(provider: 'google' | 'yandex') {
		const response = await api.get<{ url: string }>(
			`auth/oauth/connect/${provider}`
		)

		return response
	}

	/**
	 * Выход пользователя из системы.
	 *
	 * @returns {Promise<void>} - Ответ от сервера.
	 */
	public async logout() {
		const response = await api.post('auth/logout')

		return response
	}
}

export const authService = new AuthService()
