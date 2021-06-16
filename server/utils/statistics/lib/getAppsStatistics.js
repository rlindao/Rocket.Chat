import { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';

import { Apps } from '../../../services/apps';
import { Info } from '../../../../app/utils/server';

export function getAppsStatistics() {
	return {
		engineVersion: Info.marketplaceApiVersion,
		enabled: Apps.isEnabled(),
		totalInstalled: Apps.isInitialized() && Apps.getManager().get().length,
		totalActive: Apps.isInitialized() && Apps.getManager().get({ enabled: true }).length,
		totalFailed: Apps.isInitialized() && Apps.getManager().get({ disabled: true })
			.filter(({ app: { status } }) => status !== AppStatus.MANUALLY_DISABLED).length,
	};
}