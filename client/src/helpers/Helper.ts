//eslint-disable-next-line
export default new class Helper  {
	setAppStatusColor (status: number): string {
		switch(status){
			case 2:
				return 'yellow';
			case 3:
				return 'green';
			case 4:
				return 'red';
			default:
				return 'white';
		}
	}
}