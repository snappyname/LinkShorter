import { RequestHandler } from '../../app/core/api/request-handler';
import { Observable } from 'rxjs';
import { UserLinkModel } from '../../../models/generated/user-link.model';

export class UserApiService extends RequestHandler {
	public getAllUserLinks(): Observable<UserLinkModel[]> {
		return this.httpGet('/link/UserLinks');
	}

	public deleteUserLink(id: string): Observable<void> {
		return this.httpDelete(`/link/DeleteUserLink/${id}`);
	}
}
