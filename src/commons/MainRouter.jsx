
import { Route, Switch } from 'react-router-dom';
import { Routes } from '../services/configs';
import ProfilePanelLayout from './../layouts/ProfilePanelLayout';
import MyGamesAndFriends from './../profile/friendgames/MyGamesAndFriends';
import NoticeManager from './../profile/admin/NoticeManager';
import ChatRoom from './../chat/ChatRoom';
import AcountManager from './../profile/edit/AcountManager';
import MainLayout from '../layouts/MainLayout';
import GameDeck from './../games/GameDeck';
import GameGuide from './../informations/GameGuide';
import ContactUs from './../informations/ContactUs';
import ScoresTable from './../tables/scores/ScoresTable';
import SignUp from '../users/SignUp';
import Rankings from './../tables/rankings/Rankings';
import StudentsManagement from '../profile/admin/StudentsManagement';
const MainRouter = () => {
	return (
		<Switch>
			<Route path={`${Routes.Client.Profile}/:path?`} exact>
				<ProfilePanelLayout>
					<Switch>
						<Route path={Routes.Client.MyGamesAndFriends}>
							<MyGamesAndFriends />
						</Route>
						<Route path={Routes.Client.Notices}>
							<NoticeManager />
						</Route>
						<Route path={Routes.Client.StManagement}>
							<StudentsManagement />
						</Route>
						<Route path={Routes.Client.ChatRoom}>
							<ChatRoom />
						</Route>

						<Route exact path={Routes.Client.Profile}>
							<AcountManager />
						</Route>
					</Switch>
				</ProfilePanelLayout>
			</Route>
			<Route>
				<MainLayout>
					<Switch>
						<Route path={Routes.Client.SignUp}>
							<SignUp />
						</Route>

						<Route path={Routes.Client.GameDeck}>
							<GameDeck />
						</Route>
						<Route path={Routes.Client.Rankings}>
							<Rankings />
						</Route>
						<Route path={Routes.Client.GameGuide}>
							<GameGuide />/
						</Route>
						<Route path={Routes.Client.ContactUs}>
							<ContactUs />
						</Route>

						<Route path={Routes.Client.Root} exact>
							<ScoresTable />
						</Route>
					</Switch>
				</MainLayout>
			</Route>
		</Switch>
	);
};

export default MainRouter;
