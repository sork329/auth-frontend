import { api } from '@/shared/api'

import { TypeNewPasswordSchema, TypeResetPasswordSchema } from '../schemes'
import type { IAuthResponse } from '../types'

/**
 * Сервис для восстановления пароля.
 */
class PasswordRecoveryService {
	/**
	 * Сброс пароля.
	 *
	 * @param {TypeResetPasswordSchema} body - Данные для сброса пароля.
	 * @returns {Promise<IAuthResponse>} - Ответ с данными пользователя.
	 */
	public async reset(body: TypeResetPasswordSchema) {
		const response = await api.post<IAuthResponse>(
			'auth/password-recovery/reset',
			body
		)

		return response
	}

	/**
	 * Установка нового пароля.
	 *
	 * @param {TypeNewPasswordSchema} body - Данные для нового пароля.
	 * @param {string | null} token - Токен для подтверждения.
	 * @returns {Promise<IAuthResponse>} - Ответ с данными пользователя.
	 */
	public async new(
		body: TypeNewPasswordSchema,
		token: string | null
	) {
		const response = await api.post<IAuthResponse>(
			`auth/password-recovery/new/${token}`,
			body
		)

		return response
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
